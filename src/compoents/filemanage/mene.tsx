import styles from './mene.module.css';
import { FaDownload, FaHome, FaCloudUploadAlt, FaFolderOpen } from "react-icons/fa";
import { FaFileCirclePlus,FaFileCircleCheck } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useState, useRef, useEffect, forwardRef } from 'react';
import { getToken } from '../../share/share';

const UploadModal = forwardRef(({ setupload }: { setupload: React.Dispatch<React.SetStateAction<boolean>> }, ref: React.ForwardedRef<HTMLDivElement>) => {

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading'>('idle');


  const loadfile = async () => {
    if (!selectedFile) return;
    setUploadStatus('uploading');
    const formData = new FormData();
    const fileExt = selectedFile.name.split('.').pop()?.toLowerCase() || '';
    const category = ['doc', 'docx'].includes(fileExt) ? 'word' : fileExt;
    formData.append('category', category);
    formData.append('file', selectedFile);
    formData.append('public', "1");
    const response = await fetch('/api/file/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${getToken()}`
      },
      body: formData
    });
    const result = await response.json();
    if (!response.ok) {
      alert(result.error);
      console.error('上传失败，状态码:', result.error);
    }
    setUploadStatus('idle');
    close();
  }

  function close(){
      setupload(false);
      setTimeout(() => {
        setSelectedFile(null)
      }, 500);
  }
  return (
    <div className={styles.modal} ref={ref}>
      <div className={styles.modalHeader}>
        <div className={styles.modalLogo}>
          <span className={styles.logoCircle}>
            <FaFolderOpen style={{ width: "24px", height: "24px" }} />
          </span>
        </div>
        <button className={styles.btnClose} >
          <IoCloseSharp style={{ width: "24px", height: "24px" }} onClick={close} />
        </button>
      </div>

      <div className={styles.modalBody}>
        <p className={styles.modalTitle}>上传文件</p>
        <p className={styles.modalDescription}>请选择需要上传的文件</p>
        <label className={styles.uploadArea}>
          <input
            type="file"
            hidden
            accept=".pdf,.doc,.docx,.txt"
            onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
          />
          {selectedFile ? (
            <div className={styles.fileInfo}>
              <FaFileCircleCheck style={{ width: "26px", height: "26px",color:"#1cc972" }}/>
              <span>{selectedFile.name}</span>
            </div>
          ) : (
            <>
              <FaFileCirclePlus style={{ width: "24px", height: "24px" }} />
              <span>点击选择文件(最大50MB)</span>
            </>
          )}
        </label>
      </div>

      <div className={styles.modalFooter}>
        <button className={styles.btnSecondary} onClick={close}>取消</button>
        <button
          className={styles.btnPrimary}
          disabled={!selectedFile || uploadStatus === 'uploading'}  
          onClick={loadfile}
        >
          {uploadStatus === 'uploading' ? '上传中...' : '开始上传'}
        </button>
      </div>
    </div>
  );
});


const CustomComponent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [upload, setupload] = useState(false);
  useEffect(() => {
    console.log(ref.current?.classList);
    if (!upload) {
      ref.current?.classList.remove("active");
    }
    else {
      ref.current?.classList.add("active");
    }
  }, [upload]);
  const ref = useRef<HTMLDivElement | null>(null);
  return (
    <>
      <UploadModal setupload={setupload} ref={ref} />
      <div className={`${styles.base} ${isOpen ? styles.close : ''}`}>
        <div className={styles.menu} onClick={() => setIsOpen(!isOpen)}>
          <div className={styles.icon}>
            <div className={styles.bar} />
          </div>
        </div>
        <div className={styles.icons}>
          <div className={`${styles['fa-user']}`} onClick={() => setupload(true)}>
            <FaCloudUploadAlt aria-hidden="true" />
            <span style={{ fontSize: '15px' }}>上传资料</span>
          </div>
          <div className={`${styles['fa-calendar-o']}`}>
            <FaDownload aria-hidden="true" />
            <span style={{ fontSize: '15px' }}>下载客户端</span>
          </div>
          <div className={`${styles['fa-tachometer']}`}>
            <FaHome aria-hidden="true" />
            <span style={{ fontSize: '15px' }}>回到首页</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomComponent;