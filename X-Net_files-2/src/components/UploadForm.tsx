import  { useState } from 'react';
import { Upload, Image, Video } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function UploadForm() {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video' | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;
    
    setSelectedFile(file);
    
    // Create preview URL
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    console.log({
      userId: user.id,
      username: user.username,
      content,
      mediaType,
      file: selectedFile
    });
    
    // Reset form
    setContent('');
    setMediaType(null);
    setSelectedFile(null);
    setPreviewUrl(null);
  };
  
  return (
    <div className="card p-6 border border-gray-800">
      <h2 className="text-xl font-bold mb-4 flex items-center">
        <Upload className="h-5 w-5 mr-2 text-xblue-500" />
        Share with the Community
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-300 mb-1">
            What's on your mind?
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-xblue-500"
            placeholder="Share your thoughts, battles, or new combos..."
          />
        </div>
        
        <div className="mb-4">
          <div className="flex space-x-4 mb-3">
            <button
              type="button"
              onClick={() => setMediaType('image')}
              className={`flex items-center px-3 py-2 rounded-md ${
                mediaType === 'image' 
                  ? 'bg-xblue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 border border-gray-700'
              }`}
            >
              <Image className="h-5 w-5 mr-2" />
              Image
            </button>
            
            <button
              type="button"
              onClick={() => setMediaType('video')}
              className={`flex items-center px-3 py-2 rounded-md ${
                mediaType === 'video' 
                  ? 'bg-xblue-600 text-white' 
                  : 'bg-gray-800 text-gray-300 border border-gray-700'
              }`}
            >
              <Video className="h-5 w-5 mr-2" />
              Video
            </button>
          </div>
          
          {mediaType && (
            <div className="mt-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                {mediaType === 'image' ? 'Select Image' : 'Select Video'}
              </label>
              <input
                type="file"
                accept={mediaType === 'image' ? 'image/*' : 'video/*'}
                onChange={handleFileChange}
                className="block w-full text-sm text-gray-400
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-xblue-600 file:text-white
                  hover:file:bg-xblue-700"
              />
            </div>
          )}
          
          {previewUrl && (
            <div className="mt-4 rounded-md overflow-hidden bg-gray-800 p-2">
              {mediaType === 'image' ? (
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="max-h-48 max-w-full mx-auto"
                />
              ) : (
                <video 
                  src={previewUrl} 
                  controls 
                  className="max-h-48 max-w-full mx-auto"
                />
              )}
            </div>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-xblue-600 hover:bg-xblue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-xblue-500 focus:ring-offset-gray-900"
        >
          <Upload className="h-5 w-5 mr-2" />
          Share
        </button>
      </form>
    </div>
  );
}
 