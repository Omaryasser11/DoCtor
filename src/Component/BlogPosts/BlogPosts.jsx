import React from 'react';
import './styles.scss';

const BlogPosts = () => {
  return (
    <div className="full-width-section">
      <h2 className="uppercase recent-posts-title">
        Recent Posts<a href="our-blog" className="button"> / View All Posts</a>
      </h2>
      <div className="row blog-recent columns-3">
        <div className="col span_4">
          <a href="https://www.drwilliammiami.com/the-truth-about-fat-transfer-to-the-breasts/">
            <img src="https://www.drwilliammiami.com/wp-content/uploads/2024/07/blog_breast_fat_grafting-1-600x403.jpg" alt="breast implants in miami" />
          </a>
          <div className="post-header">
            <h3 className="title">
              <a href="https://www.drwilliammiami.com/the-truth-about-fat-transfer-to-the-breasts/">The Truth About Fat Transfer to the Breasts</a>
            </h3>
            <span className="meta-author">
              <a href="https://www.drwilliammiami.com/author/admin/" rel="author">Dr. William Miami</a>
            </span>
            <span className="meta-category"> | <a href="https://www.drwilliammiami.com/category/breast-augmentation/">Breast augmentation</a></span>
            <span className="meta-comment-count"> | <a href="https://www.drwilliammiami.com/the-truth-about-fat-transfer-to-the-breasts/#respond">No Comments</a></span>
          </div>
          <div className="excerpt">
            When it comes to breast augmentation, women have a few options to choose from. One popular technique is fat grafting, also known as fat transfer or fat injection.
          </div>
        </div>
        {/* Repeat similar blocks for other posts */}
      </div>
    </div>
  );
};

export default BlogPosts;
