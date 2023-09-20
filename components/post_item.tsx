import styles from '@/styles/Home.module.css'

type PostItemProp = {
    post : Post
}
const PostItem = ({post}: PostItemProp)=>{

    return (<>
    <a href={`/post-detail/${post.id}`}>
            <div className={`${styles['blog-post']}`}>
                    <div><img src={post.photo}
                    className={`${styles['image-placeholder']}`} /></div>
                    <h2>{post.title}</h2>
                    <p>{post.content.length > 20? post.content.substring(0,20)+"..." : post.content}</p>
            </div>
            </a>
    </>)
}

export default PostItem