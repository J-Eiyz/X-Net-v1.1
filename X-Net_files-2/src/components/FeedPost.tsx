import  { MessageSquare, ThumbsUp, Share } from 'lucide-react';
import { Post } from '../types';

interface FeedPostProps {
  post: Post;
}

export default function FeedPost({ post }: FeedPostProps) {
  return (
    <div className="card mb-6 border border-gray-800">
      <div className="p-4">
        <div className="flex items-center mb-3">
          <div className="w-10 h-10 rounded-full bg-xblue-700 flex items-center justify-center text-white font-bold">
            {post.username.charAt(0).toUpperCase()}
          </div>
          <div className="ml-3">
            <h3 className="font-semibold text-white">{post.username}</h3>
            <p className="text-xs text-gray-400">{new Date(post.createdAt).toLocaleString()}</p>
          </div>
        </div>
        
        <p className="text-gray-200 mb-3">{post.content}</p>
        
        {post.imageUrl && (
          <div className="mb-3 rounded-md overflow-hidden">
            <img 
              src={post.imageUrl} 
              alt="Post content" 
              className="w-full h-auto object-cover"
            />
          </div>
        )}
        
        {post.videoUrl && (
          <div className="mb-3 rounded-md overflow-hidden">
            <video 
              controls 
              className="w-full h-auto"
            >
              <source src={post.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
        
        <div className="flex justify-between text-sm text-gray-400 mt-4 pt-3 border-t border-gray-700">
          <button className="flex items-center hover:text-xblue-400">
            <ThumbsUp className="h-4 w-4 mr-1" />
            <span>{post.likes}</span>
          </button>
          <button className="flex items-center hover:text-xblue-400">
            <MessageSquare className="h-4 w-4 mr-1" />
            <span>{post.comments}</span>
          </button>
          <button className="flex items-center hover:text-xblue-400">
            <Share className="h-4 w-4 mr-1" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
 