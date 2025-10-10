
"use client";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { VideoProject } from "@/api/entities";
import { createPageUrl } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Save, X, Loader2, ArrowLeft } from "lucide-react";

const TagInput = ({ value = [], onChange }) => {
    const [inputValue, setInputValue] = useState("");
    
    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            const newTag = inputValue.trim();
            if (newTag && !value.includes(newTag)) {
                onChange([...value, newTag]);
            }
            setInputValue("");
        }
    };

    const removeTag = (tagToRemove) => {
        onChange(value.filter((tag) => tag !== tagToRemove));
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2 mb-2">
                {value.map((tag) => (
                    <Badge key={tag} className="bg-purple-500/30 text-purple-200">
                        {tag}
                        <button
                            onClick={() => removeTag(tag)}
                            className="ml-2 hover:text-white"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </Badge>
                ))}
            </div>
            <Input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a tag and press Enter"
                className="bg-gray-800 border-gray-600 focus:border-purple-500"
            />
        </div>
    );
};

export default function EditProjectPage() {
    const [project, setProject] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const projectId = new URLSearchParams(location.search).get("id");

    useEffect(() => {
        const fetchProject = async () => {
            if (!projectId) {
                navigate(createPageUrl("Projects"));
                return;
            }

            try {
                setIsLoading(true);
                const projects = await VideoProject.filter({ id: projectId });
                if (projects && projects.length > 0) {
                    setProject(projects[0]);
                } else {
                    navigate(createPageUrl("Projects"));
                }
            } catch (error) {
                console.error("Error fetching project:", error);
                navigate(createPageUrl("Projects"));
            } finally {
                setIsLoading(false);
            }
        };

        fetchProject();
    }, [projectId, navigate]);

    useEffect(() => {
        if (project) {
            document.title = `Editing: ${project.title} - GodKo`;
        } else {
            document.title = "Edit Project - GodKo";
        }
    }, [project]);

    const handleSave = async () => {
        if (!project || !projectId) return;
        
        try {
            setIsSaving(true);
            await VideoProject.update(projectId, {
                title: project.title,
                description: project.description,
                tags: project.tags,
            });
            navigate(createPageUrl("Projects"));
        } catch (error) {
            console.error("Error saving project:", error);
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-purple-400" />
            </div>
        );
    }

    if (!project) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-400">Project not found</p>
                <Button 
                    onClick={() => navigate(createPageUrl("Projects"))}
                    className="mt-4 bg-purple-600 hover:bg-purple-700"
                >
                    Back to Projects
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <Button
                variant="ghost"
                onClick={() => navigate(createPageUrl("Projects"))}
                className="mb-6 hover:bg-gray-800"
            >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Projects
            </Button>
            
            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="title" className="font-medium text-gray-300">
                            Title
                        </label>
                        <Input
                            id="title"
                            value={project.title || ""}
                            onChange={(e) => setProject({ ...project, title: e.target.value })}
                            className="text-2xl p-6 bg-gray-800 border-gray-600 focus:border-purple-500"
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label htmlFor="description" className="font-medium text-gray-300">
                            Description
                        </label>
                        <Textarea
                            id="description"
                            value={project.description || ""}
                            onChange={(e) =>
                                setProject({ ...project, description: e.target.value })
                            }
                            rows={8}
                            className="bg-gray-800 border-gray-600 focus:border-purple-500"
                            placeholder="Tell something about your video..."
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="font-medium text-gray-300">Tags</label>
                        <TagInput
                            value={project.tags || []}
                            onChange={(tags) => setProject({ ...project, tags })}
                        />
                    </div>
                    
                    <Button
                        onClick={handleSave}
                        disabled={isSaving}
                        className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700"
                    >
                        {isSaving ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : (
                            <Save className="w-4 h-4 mr-2" />
                        )}
                        {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                </div>
                
                <div className="md:col-span-1">
                    <video
                        src={project.video_url}
                        controls
                        className="w-full aspect-video rounded-lg bg-black"
                    />
                </div>
            </div>
        </div>
    );
}
