import React from "react";
import { useNavigate } from "react-router-dom";

const DocumentPortal = () => {
    const navigate = useNavigate();
  return (
    <div className="bg-gray-100 font-sans">
      <div className="text-center py-12">
        <h1 className="text-4xl font-bold text-blue-900">Document Portal</h1>
        <p className="text-gray-600">Gather documents from people</p>
        <button onClick={() => navigate("/")} className="mt-4 px-6 py-2 border border-blue-900 text-blue-900 rounded-lg hover:bg-red-900 hover:text-white transition">
          Get Started
        </button>
      </div>
      
      <div className="flex justify-center items-center relative">
        <img src="https://i.imgur.com/lV4ML8V.jpeg" alt="Folder Illustration" className="w-2/3" />
      </div>

      <div className="py-12 bg-white">
        <h2 className="text-2xl font-bold text-center text-blue-900">Tools for collecting documents</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mt-8 px-8">
          {tools.map((tool, index) => (
            <div key={index} className="text-center p-6 bg-gray-50 rounded-lg shadow">
              <img src={tool.icon} alt={tool.title} className="mx-auto mb-4" />
              <h3 className="font-semibold">{tool.title}</h3>
              <p className="text-gray-600 text-sm">{tool.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const tools = [
  {
    icon: "https://i.imgur.com/5ZnI1Ne.png",
    title: "Merge Employee Data into Forms",
    description: "Import your employee data and merge that data into all your forms instantly."
  },
  {
    icon: "https://i.imgur.com/jfNwRBl.png",
    title: "Capture Photos, Passports, and IDs",
    description: "Capture all required documents and store them in one organized place."
  },
  {
    icon: "https://i.imgur.com/yrBvOAk.png",
    title: "Send Document Requests via Text",
    description: "Send requests to people for documents that you need."
  },
  {
    icon: "https://i.imgur.com/d2u7O83.png",
    title: "Collect Safety Inspection Forms and Others",
    description: "Remotely collect forms that need to be filled out daily."
  }
];

export default DocumentPortal;
