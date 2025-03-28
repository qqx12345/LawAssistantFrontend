import React from 'react';
import styles from './home.module.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className={styles.heroContainer}>
      {/* 导航区 */}
      <nav className={styles.navBar}>
        <div className={styles.logo}>LAW ASSISTANT</div>
        <div className={styles.navLinks}>
          <Link to="/login" className={styles.navButton}>立即体验</Link>
        </div>
      </nav>

      {/* 核心内容区 */}
      <div className={styles.heroContent}>
        <h1 className={styles.mainTitle}>
          智能法律助手
          <span className={styles.highlight}>AI驱动</span>的法律解决方案
        </h1>
          <div className={styles.featureCard}>
            <h3>合同生成</h3>
            <p>自动生成专业法律文书</p>
          </div>
          <div className={styles.featureCard}>
            <h3>法律AI</h3>
            <p>7×24小时在线法律咨询</p>
          </div>
          <div className={styles.featureCard}>
            <h3>文献检索</h3>
            <p>法律文献精准查询</p>
          </div>
      </div>
    </div>
  );
};

export default Home;