import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { assets } from '../assets/assets';
import Navbar from '../components/Navbar';
import moment from 'moment';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

// Animation configurations
const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
    }
};

const Blog = () => {
    const { id } = useParams();
    const { axios } = useAppContext();

    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false);

    const [name, setName] = useState('');
    const [content, setContent] = useState('');

    const fetchBlogData = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`/api/blog/${id}`);
            data.success ? setData(data.blog) : toast.error(data.message);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchComments = async () => {
        try {
            const { data } = await axios.post('/api/blog/comments', { blogId: id });
            if (data.success) {
                setComments(data.comments);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const addComment = async (e) => {
        e.preventDefault();
        setCommentLoading(true);
        try {
            const { data } = await axios.post('/api/blog/add-comment', { blog: id, name, content });
            if (data.success) {
                toast.success(data.message);
                setName('');
                setContent('');
                fetchComments();
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            setCommentLoading(false); // Make sure to turn off loading here too!
        }
    };

    useEffect(() => {
        fetchBlogData();
        fetchComments();
    }, []);

    // If data is fetching, show fullscreen loader
    if (loading && !data) return <Loader fullScreen text="Loading article..." />;

    return data ? (
        <div className='relative overflow-hidden'>
            <img src={assets.gradientBackground} alt="" className='absolute -top-50 -z-1 opacity-50' />
            <Navbar />
            
            {/* Main Content Wrapper - Triggers staggered animations on load */}
            <motion.div 
                variants={staggerContainer} 
                initial="hidden" 
                animate="visible"
                className="pb-10"
            >
                {/* Hero Section */}
                <motion.div variants={fadeInUp} className='text-center mt-20 text-gray-600 px-4'>
                    <p className='text-primary py-4 font-medium'>Published on {moment(data.createdAt).format('MMMM Do YYYY')}</p>
                    <h1 className='text-3xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800 leading-tight'>{data.title}</h1>
                    <h2 className='my-5 text-lg max-w-lg truncate mx-auto text-gray-500'>{data.subTitle}</h2>
                    <p className='inline-block py-1 px-4 rounded-full mb-6 border text-sm border-primary/35 bg-primary/5 font-medium text-primary'>Surya Prakash Kahar</p>
                </motion.div>

                {/* Article Image & Content */}
                <div className='mx-5 max-w-5xl md:mx-auto mt-6'>
                    <motion.img 
                        variants={fadeInUp}
                        src={data.image} 
                        alt={data.title} 
                        className='rounded-3xl mb-10 w-full object-cover shadow-lg' 
                    />
                    <motion.div 
                        variants={fadeInUp}
                        className='rich-text max-w-3xl mx-auto prose prose-lg text-gray-700' 
                        dangerouslySetInnerHTML={{ __html: data.description }}
                    />
                </div>
            </motion.div>

            {/* Comments Section - Animates when scrolled into view */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={staggerContainer}
                className='mx-5 max-w-5xl md:mx-auto mt-14 mb-10'
            >
                <div className='max-w-3xl mx-auto'>
                    <motion.p variants={fadeInUp} className='text-xl font-semibold mb-6'>Comments ({comments.length})</motion.p>
                    <div className='flex flex-col gap-5'>
                        {comments.map((item, index) => (
                            <motion.div 
                                variants={fadeInUp}
                                key={index} 
                                className='relative bg-white border border-gray-100 shadow-sm max-w-xl p-5 rounded-xl text-gray-600 hover:shadow-md transition-shadow'
                            >
                                <div className='flex items-center gap-3 mb-3'>
                                    <img src={assets.user_icon} alt="" className='w-8 h-8 rounded-full bg-gray-100 p-1' />
                                    <p className='font-semibold text-gray-800'>{item.name}</p>
                                </div>
                                <p className='text-base max-w-md ml-11'>{item.content}</p>
                                <div className='absolute right-4 top-5 flex items-center gap-2 text-xs text-gray-400'>
                                    {moment(item.createdAt).fromNow()}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Add Comment Form - Animates when scrolled into view */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                className='mx-5 max-w-5xl md:mx-auto max-w-3xl'
            >
                <div className='max-w-3xl mx-auto bg-gray-50 p-6 md:p-8 rounded-2xl border border-gray-100'>
                    <p className='text-xl font-semibold mb-6'>Leave a reply</p>
                    <form onSubmit={addComment} className='flex flex-col items-start gap-4'>
                        <input 
                            onChange={(e) => setName(e.target.value)} 
                            value={name} 
                            type="text" 
                            placeholder='Your Name' 
                            required 
                            className='w-full md:max-w-md p-3 border border-gray-200 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all bg-white' 
                        />
                        <textarea 
                            onChange={(e) => setContent(e.target.value)} 
                            value={content} 
                            placeholder='What are your thoughts?' 
                            className='w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all h-32 resize-none bg-white' 
                            required
                        ></textarea>
                        <button 
                            type="submit" 
                            disabled={commentLoading} 
                            className='bg-primary text-white font-medium rounded-lg p-3 px-8 hover:bg-primary/90 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed min-w-[140px]'
                        >
                            {commentLoading ? 'Posting...' : 'Submit Comment'}
                        </button>
                    </form>
                </div>
            </motion.div>

            {/* Social Share - Animates when scrolled into view */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className='mx-5 max-w-5xl md:mx-auto my-24'
            >
                <div className='max-w-3xl mx-auto flex flex-col items-center sm:items-start'>
                    <p className='font-semibold text-lg mb-6'>Share this article</p>
                    <div className='flex gap-4'>
                        {/* Added hover scale effects to the social buttons */}
                        <motion.img whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} src={assets.facebook_icon} className="w-12 h-12 cursor-pointer drop-shadow-sm" alt="Facebook" />
                        <motion.img whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} src={assets.twitter_icon} className="w-12 h-12 cursor-pointer drop-shadow-sm" alt="Twitter" />
                        <motion.img whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} src={assets.googleplus_icon} className="w-12 h-12 cursor-pointer drop-shadow-sm" alt="Google Plus" />
                    </div>
                </div>
            </motion.div>

            <Footer />
        </div>
    ) : <Loader fullScreen text="Loading article..." />;
}

export default Blog;