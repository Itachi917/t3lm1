import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { levels, Subject, Lecture } from "@/data/seed-data";
import { useAuth } from "@/contexts/AuthContext";
import { Database, FileJson, LayoutDashboard, Send } from "lucide-react";

const Admin = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if reached this page without permission
  useEffect(() => {
    if (!loading) {
      if (!user) {
        toast.error("Please sign in to access the Admin Dashboard");
        navigate("/auth", { state: { from: { pathname: "/admin" } } });
      } else if (!isAdmin) {
        toast.error("Access Denied: You do not have admin permissions.");
        navigate("/");
      }
    }
  }, [user, isAdmin, loading, navigate]);

  // Prevent UI flickering while auth state is loading
  if (loading) return null;
  if (!isAdmin) return null;

  const uploadSubject = async (subject: Subject) => {
    // 1. Insert/Update Subject
    const { error: subjectError } = await supabase.from("subjects").upsert({
      id: subject.id,
      name: subject.name,
      name_ar: subject.nameAr,
      color: subject.color,
      icon: subject.icon,
      level_tag: subject.levelTag,
    });

    if (subjectError) throw new Error(`Subject Error: ${subjectError.message}`);

    // 2. Insert/Update Lectures
    if (subject.lectures && subject.lectures.length > 0) {
      const lecturesToInsert = subject.lectures.map((lec: Lecture) => ({
        id: lec.id,
        subject_id: subject.id,
        title: lec.title,
        title_ar: lec.titleAr,
        summary: lec.summary,
        summary_ar: lec.summaryAr,
        // Supabase expects JSON objects
        flashcards: lec.flashcards as any, 
        quiz: lec.quiz as any,
      }));

      const { error: lectureError } = await supabase
        .from("lectures")
        .upsert(lecturesToInsert);

      if (lectureError) throw new Error(`Lecture Error: ${lectureError.message}`);
    }
  };

  const handleJsonImport = async () => {
    if (!jsonInput.trim()) {
      toast.error("Please paste your JSON data first.");
      return;
    }

    try {
      setIsUploading(true);
      const parsed = JSON.parse(jsonInput);
      const subjects = Array.isArray(parsed) ? parsed : [parsed];

      for (const sub of subjects) {
        await uploadSubject(sub);
      }
      
      toast.success("Successfully imported JSON data to Supabase!");
      setJsonInput("");
    } catch (e: any) {
      toast.error(`Import failed: ${e.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  const handleSeedDatabase = async () => {
    try {
      setIsUploading(true);
      const allSubjects = levels.flatMap((l) => l.subjects);
      
      let count = 0;
      for (const sub of allSubjects) {
        await uploadSubject(sub);
        count++;
      }
      
      toast.success(`Successfully synced database with ${count} subjects!`);
    } catch (e: any) {
      toast.error(`Sync failed: ${e.message}`);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 space-y-8 max-w-5xl">
      <div className="flex items-center gap-3 border-b pb-6">
        <div className="bg-primary/10 p-3 rounded-xl">
          <LayoutDashboard className="h-8 w-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm">Control center for application data and Supabase synchronization.</p>
        </div>
      </div>

      <Tabs defaultValue="import" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="import" className="gap-2">
            <FileJson className="h-4 w-4" />
            JSON Import
          </TabsTrigger>
          <TabsTrigger value="seed" className="gap-2">
            <Database className="h-4 w-4" />
            Sync Seed Data
          </TabsTrigger>
        </TabsList>

        <TabsContent value="import">
          <Card>
            <CardHeader>
              <CardTitle>Bulk Subject Import</CardTitle>
              <CardDescription>
                Paste a valid <code>Subject</code> JSON object (including nested lectures) to insert or update it in the database.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea 
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='{ "id": "subject-id", "name": "Math", "lectures": [...] }'
                className="min-h-[400px] font-mono text-sm bg-muted/30"
              />
              <Button onClick={handleJsonImport} disabled={isUploading} className="w-full sm:w-auto gap-2">
                <Send className="h-4 w-4" />
                {isUploading ? "Uploading Data..." : "Run JSON Import"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seed">
          <Card className="border-destructive/20 shadow-sm">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center gap-2">
                Global Database Sync
              </CardTitle>
              <CardDescription>
                This operation reads <code>src/data/seed-data.ts</code> and forces all local data into Supabase.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-muted p-4 rounded-lg text-sm border">
                <p className="font-semibold mb-2 flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Local Environment Stats:
                </p>
                <div className="grid grid-cols-2 gap-4 opacity-80">
                  <div>Levels Detected: <span className="font-mono text-primary font-bold">{levels.length}</span></div>
                  <div>Subjects to Sync: <span className="font-mono text-primary font-bold">{levels.flatMap(l => l.subjects).length}</span></div>
                </div>
              </div>
              <Button 
                onClick={handleSeedDatabase} 
                disabled={isUploading}
                variant="destructive"
                className="w-full sm:w-auto"
              >
                {isUploading ? "Synchronizing..." : "Overwrite Supabase with Local Seed Data"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
