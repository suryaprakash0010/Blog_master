import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import BlogList from '../components/BlogList';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import Loader from '../components/Loader';
import { useAppContext } from '../context/AppContext';

// We define our animation rules once to keep the code clean
const fadeInUp = {
    hidden: { opacity: 0, y: 50 }, // Starts invisible and pushed down 50px
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 0.7, ease: "easeOut" } // Glides up smoothly
    }
};

const Home = () => {
    const { blogs } = useAppContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (blogs.length > 0) {
            setLoading(false);
        }
        
        // Failsafe: If the API is slow or returns 0 blogs, don't trap the user on a loading screen.
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 4000); 

        return () => clearTimeout(timeout);
    }, [blogs]);

    if (loading) {
        return <Loader fullScreen text="Loading blogs..." />;
    }

    return (
        /* The main wrapper sets up the stagger effect */
        <motion.div 
            initial="hidden" 
            animate="visible"
            // staggerChildren makes each section load slightly after the previous one
            transition={{ staggerChildren: 0.2 }}
            className="min-h-screen bg-gray-50"
        >
            <Navbar />
            
            {/* Header slides in on initial load */}
            <motion.div variants={fadeInUp}>
                <Header />
            </motion.div>

            {/* BlogList slides in right after the header */}
            <motion.div variants={fadeInUp}>
                <BlogList />
            </motion.div>

            {/* whileInView makes the Newsletter animate ONLY when the user scrolls down to it */}
            <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }} // Triggers slightly before it enters the viewport
                variants={fadeInUp}
            >
                <Newsletter />
            </motion.div>

            <Footer />
        </motion.div>
    );
}

export default Home;