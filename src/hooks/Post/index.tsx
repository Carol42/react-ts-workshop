import React, { createContext, useCallback, useContext, useState } from 'react';
import { Post } from '../../@types/Post';
import { Response } from '../../@types/Response';
import { api } from '../../services/api';

interface PostContextData {
  posts: Post[];
  addPost: (newPost: Post) => void;
  fetchPosts: () => Promise<Post[]>;
}

const PostContext = createContext<PostContextData>({} as PostContextData);

export const PostProvider: React.FC = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>(() => {
    const storagePosts = localStorage.getItem('@krud:posts');

    if (storagePosts) {
      return [...JSON.parse(storagePosts)];
    }
    return [] as Post[];
  });

  const fetchPosts = useCallback(async (): Promise<Post[]> => {
    const { data }: { data: Response<Post[]> } = await api.get('post/read');

    return data.content as Post[];
  }, []);

  const addPost = useCallback((newPost: Post) => {
    setPosts(prev => {
      const newPosts = [...prev, newPost];
      localStorage.setItem('@krud:posts', JSON.stringify(newPosts));

      return newPosts;
    });
  }, []);

  return (
    <PostContext.Provider
      value={{
        posts,
        addPost,
        fetchPosts,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};

export const usePost = (): PostContextData => {
  const context = useContext(PostContext);

  if (!context) {
    throw new Error('This feature must be used within a provider');
  }

  return context;
};
