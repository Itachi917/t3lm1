import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { levels } from "@/data/seed-data"; // Importing your static data to seed it
import { Subject, Lecture } from "@/data/seed-data";

const Admin = () => {
  const [jsonInput, setJsonInput] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to upload a single subject and its lectures
  const uploadSubject = async (subject: Subject) => {
    // 1. Insert Subject
    const { error: subjectError } = await supabase.from("subjects").upsert({
      id: subject.id,
      name: subject.name,
      name_ar: subject.nameAr,
      color: subject.color,
      icon: subject.icon,
      level_tag: subject.levelTag,
    });

    if (subjectError) throw new Error(`Subject Error: ${subjectError.message}`);

    // 2. Insert Lectures
    if (subject.lectures && subject.lectures.length > 0) {
      const lecturesToInsert = subject.lectures.map((lec: Lecture) => ({
        id: lec.id,
        subject_id: subject.id,
        title: lec.title,
        title_ar: lec.titleAr,
        summary: lec.summary,
        summary_ar: lec.summaryAr,
        // Supabase expects JSON objects, strict casting helps TS
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
      setLoading(true);
      const parsed = JSON.parse(jsonInput);
      
      // Handle both single object or array
      const subjects = Array.isArray(parsed) ? parsed : [parsed];

      for (const sub of subjects) {
        await uploadSubject(sub);
      }
      
      toast.success("Successfully imported JSON data!");
      setJsonInput("");
    } catch (e: any) {
      toast.error(`Import failed: ${e.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSeedDatabase = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
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
                Paste a JSON object matching the <code>Subject</code> interface (including nested lectures).
              </p>
              <Textarea 
                value={jsonInput}
                onChange={(e) => setJsonInput(e.target.value)}
                placeholder='{ "id": "math101", "name": "Math", ... }'
                className="min-h-[300px] font-mono"
              />
              <Button onClick={handleJsonImport} disabled={loading}>
                {loading ? "Importing..." : "Import JSON"}
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
                This will read all data currently in <code>src/data/seed-data.ts</code> and upload it to your Supabase database.
                It will update existing records if IDs match.
              </p>
              <Button 
                onClick={handleSeedDatabase} 
                disabled={loading}
                variant="destructive"
              >
                {loading ? "Seeding..." : "Upload All Seed Data to Supabase"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;
