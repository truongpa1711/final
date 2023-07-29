import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import imgUpdate from "../img/update.jpg";
import imgDelete from "../img/delete.jpg";

function HomePage(props) {
    const [phongban, setPhongban] = useState([]);
    const [nhanvien, setNhanvien] = useState([]);
    const [departmentNames, setDepartmentNames] = useState({}); // Store department names in a dictionary


    const pb = () => {
        let url = "https://64bfca600d8e251fd1116f33.mockapi.io/truongpa/phongban";
        axios(url)
            .then(res => setPhongban(res.data))
            .catch(err => console.error(err));
    }

    const nv = () => {
        let url = "https://64bfca600d8e251fd1116f33.mockapi.io/truongpa/nhanvien";
        axios(url)
            .then(res => setNhanvien(res.data))
            .catch(err => console.error(err));
    }

    const load = () => {
        let url = "https://64bfca600d8e251fd1116f33.mockapi.io/truongpa/nhanvien";
        axios.get(url)
            .then(res => { console.log(res.data) })
            .catch(err => { console.error(err) });
    }

    const deleteNv = (index) => {
        let item = nhanvien[index];
        let isDelete = window.confirm("Bạn muốn xóa nhân viên: " + item.ten);
        if (isDelete) {
            let url = "https://64bfca600d8e251fd1116f33.mockapi.io/truongpa/nhanvien/" + item.id;
            axios.delete(url)
                .then(res => {
                    alert("Xóa thành công!");
                    pb();
                    nv();
                })
                .catch(err => console.error(err));
        }
    }

    // Function to get the department name by department ID
    const getDepartmentName = (departmentId) => {
        return departmentNames[departmentId] || "Unknown";
    }

    useEffect(() => {
        pb();
        nv();
        load();

        // Populate departmentNames dictionary when phongban data is available
        const departmentDict = {};
        phongban.forEach(department => {
            departmentDict[department.idpb] = department.ten;
        });
        setDepartmentNames(departmentDict);
    }, [phongban]);

    return (
        <div>
            <h3>Danh sách phòng ban</h3>
            <table border={1}>
                <tbody>
                    <tr>
                        <td>STT</td>
                        <td>ID phòng ban</td>
                        <td>Tên phòng ban</td>
                    </tr>
                    {phongban?.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.idpb}</td>
                            <td>{item.ten}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h3>Danh sách nhân viên</h3>
            <table border={1}>
                <tbody>
                    <tr>
                        <td>STT</td>
                        <td>ID Nhân viên</td>
                        <td>ID Phòng ban</td>
                        <td>Tên phòng ban</td>
                        <td>Tên</td>
                        <td>SĐT</td>
                        <td>Trạng thái</td>
                        <td>Địa chỉ</td>
                        <td>Update</td>
                        <td>Delete</td>
                    </tr>
                    {nhanvien?.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.idnv}</td>
                            <td>{item.idpbnv}</td>
                            {/* Display the department name based on the department ID */}
                            <td>{getDepartmentName(item.idpbnv)}</td>
                            <td>{item.ten}</td>
                            <td>{item.sdt}</td>
                            <td>{item.trangthai ? "Đang làm" : "Đã nghỉ"}</td>
                            <td>{item.diachi}</td>
                            <td align='center'><Link to={"/form/" + item.id}><img src={imgUpdate} alt="Update" /></Link></td>
                            <td align='center'><Link><img src={imgDelete} alt="Delete" onClick={() => deleteNv(index)} /></Link></td>
                        </tr>
                    ))}
                </tbody>    
            </table>
        </div>
    );
}

export default HomePage;
