import * as React from 'react'
import styles from '@/styles/Home.module.css'
import { useEffect } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'

type PostDetailProps = {
        post?: Post
        errors?: string
      }
const PostDetail = ({ post, errors }: PostDetailProps) => {

    return (
        <>
  {post != null && <div className={styles.postDetailContainer}>
  <div className={styles.postphotoContainer}>
    <img src={post.photo} alt={post.title} className={styles.postphoto} />
  </div>
  <div className={styles.postInfoContainer}>
    <h1 className={styles.postName}>{post.title}</h1>
    <div className={styles.postAttributes}>
      <p>
         {post.content}
      </p>
      <p>
        <strong>Date:</strong> {post.date.toLocaleString()}
      </p>
    
    </div>
  </div>
</div>}
</>
    )

}

export default PostDetail


export const getStaticPaths: GetStaticPaths = async () => {
    // Get the paths we want to pre-render based on users
    const paths = [
      { params: { id: '1' } },
      { params: { id: '2' } },
      // Add more paths as needed
    ];
  
    // We'll pre-render only these paths at build time.
    // { fallback: false } means other routes should 404.
    return { paths, fallback: false }
  }
  
export const getStaticProps: GetStaticProps = async ({ params }) => {
    try {
      
      const id = params?.id
      
      const response = await fetch(`https://raw.githubusercontent.com/boma25/blog/main/data.json`);
      const result  = await response.json();
    const allPosts = result['posts'];
    
      const post: Post = allPosts.find((el:Post)=> el.id == parseInt(`${id}`))
      
      // By returning { props: item }, the CharacterDetail component
      // will receive `item` as a prop at build time
      return { props: { post } }
    } catch (err: any) {
      return { props: { errors: err.message } }
    }
  }
  