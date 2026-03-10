import styled from "styled-components"
import { usePosts } from "../hooks/usePosts"
import CreatePost from "../components/CreatePost"
import PostCard from "../components/PostCard"
import type { Post } from "../types/Post"

export default function Home() {

  const { data: posts, isLoading } = usePosts()

  if (isLoading) {
    return <Loading>Loading...</Loading>
  }

  return (
    <Container>

      <CreatePost />

      {posts?.map((post: Post) => (
        <PostCard
          key={post.id}
          post={post}
        />
      ))}

    </Container>
  )
}

const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;

  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Loading = styled.p`
  text-align: center;
`