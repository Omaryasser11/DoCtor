import React from 'react';
import './RecentPosts.scss';

const RecentPosts = () => {
  const posts = [
    {
      title: 'The Truth About Fat Transfer to the Breasts',
      author: 'Dr. William Miami',
      category: 'Breast augmentation',
      image: 'https://www.drwilliammiami.com/wp-content/uploads/2024/07/blog_breast_fat_grafting-1-600x403.jpg',
      excerpt: 'When it comes to breast augmentation, women have a few options to choose from. One popular technique is fat grafting, also known as fat transfer or fat injection.',
      link: 'https://www.drwilliammiami.com/the-truth-about-fat-transfer-to-the-breasts/',
    },
    {
      title: 'Understanding Breast Sensitivity Changes Post-Surgery',
      author: 'Dr. William Miami',
      category: 'Breast augmentation, Breast Lift, Cosmetic Surgery',
      image: 'https://www.drwilliammiami.com/wp-content/uploads/2024/07/Blog_nipple_sensitivity_1920X1280-copy-600x403.jpg',
      excerpt: 'Discover expert insights from Dr. William on managing postoperative nipple sensitivity after breast surgery. Learn causes, coping strategies, and recovery tips for enhanced comfort.',
      link: 'https://www.drwilliammiami.com/understanding-breast-sensitivity-changes-post-surgery/',
    },
    {
      title: 'Preventing Capsular Contracture: 10 Important Steps',
      author: 'Dr. William Miami',
      category: 'Breast augmentation, Cosmetic Surgery',
      image: 'https://www.drwilliammiami.com/wp-content/uploads/2024/06/blog_capsular_contracture_06-11-600x403.jpg',
      excerpt: 'Capsular contracture is a common complication that can occur after breast augmentation surgery. Preventing capsular contracture is essential for a successful outcome.',
      link: 'https://www.drwilliammiami.com/preventing-capsular-contracture-10-important-steps/',
    },
    {
      title: 'Revolutionizing Rhinoplasty',
      author: 'Dr. William Miami',
      category: 'Plastic Surgery',
      image: 'https://www.drwilliammiami.com/wp-content/uploads/2024/05/Ultrasound_Blog3-600x403.jpg',
      excerpt: 'Rhinoplasty, commonly known as a "nose job," has been a popular cosmetic procedure for decades. Over the years, the techniques used in rhinoplasty have evolved, with each advancement offering unique…',
      link: 'https://www.drwilliammiami.com/revolutionizing-rhinoplasty/',
    },
    {
      title: 'FibroGuard: The Secret to a Smooth Liposuction Recovery',
      author: 'Dr. William Miami',
      category: 'Cosmetic Surgery, Liposuction, post-op recovery',
      image: 'https://www.drwilliammiami.com/wp-content/uploads/2024/04/1920x1280_03-600x403.jpg',
      excerpt: 'FibroGuard is a revolutionary product designed specifically to combat post-liposuction fibrosis and promote soft, supple, and smooth skin.',
      link: 'https://www.drwilliammiami.com/fibroguard-the-secret-to-a-smooth-liposuction-recovery/',
    },
    {
      title: 'How Long Will It Take for My Breast Implants to Settle?',
      author: 'Dr. William Miami',
      category: 'Breast augmentation',
      image: 'https://www.drwilliammiami.com/wp-content/uploads/2024/03/1920x1280-600x403.jpg',
      excerpt: 'The question then becomes what causes implant settling and why aren\'t the implants in the correct position to begin with? We used to see long times for implant descent quite…',
      link: 'https://www.drwilliammiami.com/how-long-will-it-take-for-my-breast-implants-to-settle/',
    },
  ];

  return (
    <div className="recent-posts">
      <h2 className="recent-posts-title">
        Recent Posts
        <a href="our-blog" className="button">/ View All Posts</a>
      </h2>
      <div className="blog-recent">
        {posts.map((post, index) => (
          <div key={index} className="post">
            <a href={post.link}>
              <img src={post.image} alt={post.title} />
            </a>
            <div className="post-header">
              <h3 className="title">
                <a href={post.link}>{post.title}</a>
              </h3>
              <span className="meta-author">
                <a href={`https://www.drwilliammiami.com/author/admin/`} title={`Posts by ${post.author}`} rel="author">{post.author}</a>
              </span>
              <span className="meta-category"> | {post.category.split(', ').map((cat, i) => (
                <span key={i}>
                  <a href={`https://www.drwilliammiami.com/category/${cat.toLowerCase().replace(' ', '-')}/`}>{cat}</a>
                  {i < post.category.split(', ').length - 1 && ', '}
                </span>
              ))} </span>
            </div>
            <div className="excerpt">{post.excerpt}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentPosts;
