import { useState, useEffect, useRef } from "react";
import Style from './index.module.css'
import CustomComponent from './mene.tsx'
import { FaSearch } from "react-icons/fa";
import { BiChevronRight } from "react-icons/bi";
import { LuDownload } from "react-icons/lu";
import { FiFilter } from "react-icons/fi";
type Headers = {
    id: number,
    content: string,
    pick: boolean
}

type SecrchData = {
    id: number,
    title: string,
    time: string,
    type: string,
}

type response = {
    total: number,
    array: SecrchData[]
}

type Path = {
    id: number,
    path: string,
    content: string,
    check: boolean
}

type HeadersProps = {
    token: string | null,
    setsearch: React.Dispatch<React.SetStateAction<response>>,
    setsearchmode: React.Dispatch<React.SetStateAction<number>>, // 新增
    searchmode: number // 新增
};

const Headers: React.FC<HeadersProps> = ({ setsearch, token, searchmode, setsearchmode }) => {
    const [check, setCheck] = useState(1);
    const [input, setInput] = useState<string>("");
    const list: Headers[] = [
        { id: 1, content: "法律法规", pick: check === 1 },
        { id: 2, content: "法学期刊", pick: check == 2 },
        { id: 3, content: "法律AI", pick: check == 3 },
        { id: 4, content: "法律咨询", pick: check == 4 },
    ]
    const Path: Path[] = [
        { id: 2, content: "关键词搜索", path: "keyword", check: 2 === searchmode },
        { id: 3, content: "高级搜索", path: "advanced", check: 3 === searchmode }
    ]
    const modeList = useRef<(HTMLDivElement | null)>(null);

    const disPlay = (): void => {
        if (modeList.current?.classList.contains("active")) {
            modeList.current?.classList.remove("active");
        }
        else {
            modeList.current?.classList.add("active");
        }
    };
    useEffect(() => {
        function remove() {
            modeList.current?.classList.remove("active");
        }
        setTimeout(() => {
            remove()
        }, 1000);
    }, [searchmode])

    useEffect(() => {
        searchdata();
    },[]);
    
    async function searchdata() {
        const result = Path.find((el) => el.id === searchmode);
        const raw = JSON.stringify({
            "keyword": input,
            "fuzzy": false
        });
        try {
            const res = await fetch(`/api/file/search/${result?.path}`, {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: raw
            });

            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }

            const data = await res.json();

            const filteredData = data.data.documents.map((item) => ({
                id: item.id,
                title: item.title,
                time: item.update_time ? item.update_time.slice(0, 10) : "",
                type: item.type
            }));

            setsearch({
                total: data.data.total,
                array: filteredData
            });
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };


    return (
        <div className={Style.header}>
            <div className={Style.nav}>
                <div className={Style.logo}>
                    <img src="/public/vite.svg" alt="logo" style={{ width: '100%' }} />
                </div>
                {list.map((element) => {
                    return (
                        <div
                            className={`${Style.item} ${element.pick ? Style.picked : ""}`} // 动态添加类名
                            key={element.id}
                            onClick={() => setCheck(element.id)}
                        >
                            {element.content}
                        </div>
                    );
                })}
                <div className={Style.item}>更多</div>
            </div>
            <div className={Style.secrch}>
                <div className={Style.modelist} ref={modeList}>
                    {Path.map((el) => {
                        return (
                            <div
                                className={Style.secrchWay}
                                onClick={() => setsearchmode(el.id)}
                                key={el.id}
                                style={el.check ? { backgroundColor: '#84ade1b9' } : {}}
                            >
                                {el.content}
                            </div>
                        );
                    })}
                </div>
                <BiChevronRight className={Style.mode} onClick={disPlay} />
                <input type="text" placeholder="secrch" onChange={(e) => setInput(e.target.value)} />
                <a href="#" className={Style.start} onClick={searchdata}>
                    <FaSearch />
                </a>
            </div>
            <div className={Style.right}>
                <button>个人资料</button>
            </div>
        </div>
    )
}

const Search = () => {
    return (
        <div className={Style.search}>
            <div className={Style.searchContent}>
                {/* 文件类型选择 */}
                <div className={Style.searchItem}>
                    <div className={Style.searchLabel}>
                        <span>文件类型:</span>
                    </div>
                    <div className={Style.searchInput}>
                        <select>
                            <option value="all">全部</option>
                            <option value="txt">文本文件</option>
                            <option value="pdf">PDF</option>
                        </select>
                    </div>
                </div>

                {/* 时间范围选择 */}
                <div className={Style.searchItem}>
                    <div className={Style.searchLabel}>
                        <span>时间范围:</span>
                    </div>
                    <div className={Style.searchInput}>
                        <input type="date" /> 至 <input type="date" />
                    </div>
                </div>

                {/* 关键词输入 */}
                <div className={Style.searchItem}>
                    <div className={Style.searchLabel}>
                        <span>关键词:</span>
                    </div>
                    <div className={Style.searchInput}>
                        <input type="text" placeholder="请输入关键词" />
                    </div>
                </div>

                {/* 搜索按钮 */}
                <button className={Style.searchButton}>开始搜索</button>
            </div>
        </div>
    )
}

const Index = () => {
    const [search, setsearch] = useState<response>({ total: 0, array: [] });
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchmode, setsearchmode] = useState(2);
    const [selectedType, setSelectedType] = useState<string>('');
    const token = localStorage.getItem("token")
    useEffect(() => {
        console.log(search);
    }, [search]);

    function download(id: number) {
        fetch(`/api/file/download/${id}`, {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${token}`,
            },
            redirect: 'follow'
        })
            .then(response => {
                // 从响应头获取文件名和类型
                if (response.status === 403) {
                    alert("权限不足，无法下载该文件");
                    throw new Error('权限不足，无法下载该文件');
                }
                const contentDisposition = response.headers.get('content-disposition');
                // 解析文件名（优先使用服务器返回的文件名）
                let filename = `file_${id}`;
                if (contentDisposition) {
                    const match = contentDisposition.match(/filename="?(.+?)"?$/);
                    if (match) filename = match[1];
                }

                return response.blob().then(blob => ({ blob, filename: filename }));
            })
            .then(({ blob, filename }) => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            })
            .catch(error => console.log('Download error:', error));
    }

    // 修改filter函数
    function filter(fileType: string) {
        setSelectedType(prev => prev === fileType ? '' : fileType); // 点击相同按钮取消筛选
    }
    return (
        <div className={Style.container}>
            <Headers setsearch={setsearch} token={token} setsearchmode={setsearchmode} searchmode={searchmode} />
            {searchmode === 3 && <Search />}
            <div className={Style.content}>
                <div className={Style.list}>
                    <div className={Style.op}>
                        <div className={Style.select}><FiFilter /></div>
                        <div className={Style.filters}>
                            <span>类型筛选:</span>
                            <input id="r0" type="radio" name="radio" checked={!selectedType} onChange={() => setSelectedType('')} />
                            <label htmlFor="r0">全部</label>
                            <input id="r1" type="radio" name="radio" value="txt" onChange={() => filter('txt')} />
                            <label htmlFor="r1">txt</label>
                            <input id="r2" type="radio" name="radio" value="pdf" onChange={() => filter('pdf')} />
                            <label htmlFor="r2">pdf</label>
                            <input id="r3" type="radio" name="radio" value="docx" onChange={() => filter('word')} />
                            <label htmlFor="r3">word</label>
                        </div>
                    </div>
                    <div className={Style.total}>
                        Total: {selectedType ? search.array.filter(item => item.type === selectedType).length : search.total}
                    </div>
                    <div className={Style.datalist}>
                        {search.array.length > 0 ? (
                            search.array.filter(item => !selectedType || item.type === selectedType).slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                            .map((el) => (
                                <div className={Style.card} key={el.id}>
                                <div className={Style.topSection}>
                                  <div className={Style.border}></div>
                                  <span className={Style.title}>{el.title}</span>
                                </div>
                                <div className={Style.bottomSection}>
                                  <div className={Style.row}>
                                    <div className={Style.item}>
                                      <span className={Style.bigText}>{el.time}</span>
                                    </div>
                                    <div className={Style.item}>
                                      <span className={Style.bigText}>{el.type}</span>
                                    </div>
                                    <div className={Style.item}>
                                      <LuDownload className={Style.downloadIcon} onClick={()=>download(el.id)}></LuDownload>
                                      <span className={Style.regularText}>download</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))
                        ) : (
                            <div>No data found.</div>
                        )}
                    </div>
                </div>
            </div>
            <div className={Style.pagination}>
                <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                >
                    上一页
                </button>

                <span>第 {currentPage} 页 / 共 {Math.ceil(search.total / itemsPerPage)} 页</span>

                <button
                    onClick={() => setCurrentPage(p => p + 1)}
                    disabled={currentPage * itemsPerPage >= search.total}
                >
                    下一页
                </button>
            </div>
            <CustomComponent />
        </div>
    )
}

export default Index;