import { useEffect, useState } from "react";
import PostItem from "./post_item";
import styles from '@/styles/Home.module.css'



const PostListLink = "https://raw.githubusercontent.com/boma25/blog/main/data.json";
const PostList = () => {
    //instantiate blog list variable
    const [blogs, setBlogs] = useState<Array<Post>>([])
    const [pageList, setPageList] = useState<Array<Post>>([])
    const [currentPage, setCurrentPage] = useState(1);
    const PAGE_DISPLAY = 10;

    const startIndex = (currentPage - 1) * PAGE_DISPLAY;
    const endIndex = startIndex + PAGE_DISPLAY;
    const currentItems = blogs.slice(startIndex, endIndex);

    // Function to handle page changes
    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };


    //Fetch our blog list 
    useEffect(() => {
        fetch(PostListLink).then((res) => {
            res.json().then((resObject) => {

                setBlogs(resObject['posts'] as Array<Post>);

            })
        })
    }, [])


    return (<>
        <div> <h1>Post Count: {blogs.length}</h1></div>

        <div className={`${styles['blog-list']}`}>

            {blogs.length > 0 ?
                currentItems.map((post) => {
                    return (<div>
                        <PostItem post={post} />
                    </div>)
                })
                :
                <div><p>Loading...</p></div>

            }

            {/* Pagination controls */}
            <div className="pagination">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={endIndex >= blogs.length}
                >
                    Next
                </button>
            </div>

        </div>
    </>);
}

export default PostList;