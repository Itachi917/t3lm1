import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { levels, Subject, Lecture } from "@/data/seed-data";
import { useAuth } from "@/contexts/AuthContext";

const Admin = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  // Redirect if somehow reached this page without permission
  useEffect(() => {
    if (!loading) {
      if (!user) navigate("/auth");
      else if (!isAdmin) navigate("/");
    }
  }, [user, isAdmin, loading, navigate]);

  // Just return null instead of a blocking "Checking permissions..." text
  // This prevents the flickering or stuck text
  if (loading) return null;

  // Render the page normally...
  // (The rest of your file logic remains the same below)

  const uploadSubject = async (subject: Subject) => {
    // ... same as before
    const { error: subjectError } = await supabase.from("subjects").upsert({
      id: subject.id,
      name: subject.name,
      name_ar: subject.nameAr,
      color: subject.color,
      icon: subject.icon,
      level_tag: subject.levelTag,
    });
    if (subjectError) throw new Error(`Subject Error: ${subjectError.message}`);

    if (subject.lectures && subject.lectures.length > 0) {
      const lecturesToInsert = subject.lectures.map((lec: Lecture) => ({
        id: lec.id,
        subject_id: subject.id,
        title: lec.title,
        title_ar: lec.titleAr,
        summary: lec.summary,
        summary_ar: lec.summaryAr,
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
    try {
      setIsLoading(true);
      const parsed = JSON.parse(jsonInput);
      const subjects = Array.isArray(parsed) ? parsed : [parsed];
      for (const sub of subjects) {
        await uploadSubject(sub);
      }
      toast.success("Successfully imported JSON data!");
      setJsonInput("");
    } catch (e: any) {
      toast.error(`Import failed: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSeedDatabase = async () => {
    try {
      setIsLoading(true);
      const allSubjects = levels.flatMap((l) => l.subjects);
      let count = 0;
      for (const sub of allSubjects) {
        await uploadSubject(sub);
        count++;
      }
      toast.success(`Database seeded with ${count} subjects from seed-data.ts`);
    } catch (e: any) {
      toast.error(`Seeding failed: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4 space-y-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <Tabs defaultValue="import">
        <TabsList>
          <TabsTrigger value="import">JSON Import</TabsTrigger>
          <TabsTrigger value="seed">Seed Database</TabsTrigger>
        </TabsList>

        <TabsContent value="import" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Import Subject JSON</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Paste a JSON object matching the <code>Subject</code> interface.
              </p>
              <Textarea 
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='{ "id": "math101", ... }'
                className="min-h-[300px] font-mono"
              />
              <Button onClick={handleJsonImport} disabled={isLoading}>
                {isLoading ? "Importing..." : "Import JSON"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seed" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Initial Setup</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Upload <code>src/data/seed-data.ts</code> to Supabase.
              </p>
              <Button 
                onClick={handleSeedDatabase} 
                disabled={isLoading}
                variant="destructive"
              >
                {isLoading ? "Seeding..." : "Upload All Seed Data"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
