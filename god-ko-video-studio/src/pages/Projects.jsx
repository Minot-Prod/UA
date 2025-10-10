
"use client";
import React, { useState, useEffect } from "react";
import { VideoProject } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Plus, Film, Trash2, Edit } from "lucide-react";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const ProjectCard = ({ project, onDelete }) => {
    const navigate = useNavigate();
    return (
        <Card className="bg-gray-800 border-gray-700 text-white flex flex-col overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
    <CardHeader>
      <div className="relative aspect-video bg-black rounded-md overflow-hidden">
        <video
          src={project.video_url}
          className="w-full h-full object-cover"
          muted
          onMouseOver={(e) => e.target.play()}
          onMouseOut={(e) => e.target.pause()}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <h3 className="absolute bottom-2 left-3 text-lg font-bold">
          {project.title}
        </h3>
      </div>
    </CardHeader>
    <CardContent className="flex-grow">
      {project.tags && project.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {project.tags.slice(0, 4).map((tag, index) => (
            <Badge key={index} variant="secondary" className="bg-purple-500/20 text-purple-300">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </CardContent>
    <CardFooter className="flex justify-end gap-2">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive" size="icon">
            <Trash2 className="w-4 h-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the project "{project.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-gray-600 hover:bg-gray-700">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => onDelete(project.id)}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <Button
        onClick={() => navigate(createPageUrl(`EditProject?id=${project.id}`))}
        size="icon"
        className="bg-purple-600 hover:bg-purple-700"
      >
        <Edit className="w-4 h-4" />
      </Button>
    </CardFooter>
  </Card>
    );
};

export default function ProjectsPage() {
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const loadProjects = async () => {
        setIsLoading(true);
        const data = await VideoProject.list("-created_date");
        setProjects(data);
        setIsLoading(false);
    };

    useEffect(() => {
        document.title = "My Projects - GodKo";
        loadProjects();
    }, []);

    const handleDelete = async (id) => {
        await VideoProject.delete(id);
        loadProjects();
    };

    return (
        <div>
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold flex items-center gap-3">
        <Film className="w-8 h-8" />
        My Projects
      </h1>
      <Link to={createPageUrl("Upload")}>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </Link>
    </div>

    {isLoading ? (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i} className="bg-gray-800 border-gray-700 animate-pulse">
                <CardHeader><div className="aspect-video bg-gray-700 rounded-md"></div></CardHeader>
                <CardContent><div className="h-4 w-3/4 bg-gray-700 rounded"></div></CardContent>
                <CardFooter className="flex justify-end gap-2">
                    <div className="w-10 h-10 bg-gray-700 rounded"></div>
                    <div className="w-10 h-10 bg-gray-700 rounded"></div>
                </CardFooter>
            </Card>
        ))}
      </div>
    ) : projects.length === 0 ? (
      <div className="text-center py-20 bg-gray-800/50 rounded-lg">
        <h2 className="text-xl font-semibold">No projects yet</h2>
        <p className="text-gray-400 mt-2 mb-4">
          Click "New Project" to upload your first video.
        </p>
        <Link to={createPageUrl("Upload")}>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Upload Video
          </Button>
        </Link>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onDelete={handleDelete}
          />
        ))}
      </div>
    )}
  </div>
    );
}
