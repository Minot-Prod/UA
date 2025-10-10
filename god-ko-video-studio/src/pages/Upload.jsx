
"use client";
import React, { useState, useEffect } from "react";
import { VideoProject } from "@/api/entities";
import { UploadFile } from "@/api/integrations";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { UploadCloud, Loader2, CheckCircle } from "lucide-react";

export default function UploadPage() {
    const navigate = useNavigate();
    const [uploading, setUploading] = useState(false);
    const [uploadComplete, setUploadComplete] = useState(false);
    const [error, setError] = useState(null);
    const [dragActive, setDragActive] = useState(false);

    useEffect(() => {
        document.title = "Upload New Video - GodKo";
    }, []);

    const handleFileSelect = async (file) => {
        if (!file) return;

        setError(null);
        setUploading(true);
        setUploadComplete(false);

        try {
            const { file_url } = await UploadFile({ file });

            const newProject = await VideoProject.create({
                title: file.name.replace(/\.[^/.]+$/, ""), // Use filename as default title
                video_url: file_url,
            });

            setUploadComplete(true);

            setTimeout(() => {
                navigate(createPageUrl(`EditProject?id=${newProject.id}`));
            }, 1000);
        } catch (e) {
            setError("Upload failed. Please try again.");
            console.error(e);
            setUploading(false);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragActive(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragActive(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    const handleFileInputChange = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            handleFileSelect(files[0]);
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3">
                <UploadCloud className="w-8 h-8" />
                Upload New Video
            </h1>

            <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
                    dragActive
                        ? "border-purple-400 bg-purple-500/10"
                        : "border-gray-600 hover:border-gray-500"
                }`}
            >
                <input
                    type="file"
                    accept="video/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                    id="video-upload"
                />
                <div className="flex flex-col items-center">
                    {uploading ? (
                        <>
                            {uploadComplete ? (
                                <CheckCircle className="w-16 h-16 text-green-400 mb-4" />
                            ) : (
                                <Loader2 className="w-16 h-16 text-purple-400 animate-spin mb-4" />
                            )}
                            <p className="text-lg font-semibold">
                                {uploadComplete
                                    ? "Upload Complete!"
                                    : "Uploading, please wait..."}
                            </p>
                            <p className="text-gray-400">
                                {uploadComplete
                                    ? "Redirecting to editor..."
                                    : "Your video is being processed."}
                            </p>
                        </>
                    ) : (
                        <>
                            <UploadCloud className="w-16 h-16 text-gray-500 mb-4" />
                            <p className="text-lg font-semibold">
                                Drag & drop video file here
                            </p>
                            <p className="text-gray-400">or</p>
                            <Button 
                                variant="outline" 
                                className="mt-4 bg-transparent border-gray-500 hover:bg-gray-800"
                                onClick={() => document.getElementById('video-upload').click()}
                            >
                                Browse File
                            </Button>
                        </>
                    )}
                </div>
            </div>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
    );
}
