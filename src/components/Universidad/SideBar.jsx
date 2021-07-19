import React from 'react'
import {Table, Button} from 'react-bootstrap'
import '../../styles/components/SideBar.css'

const SideBar = () => {
    return (
        <aside className="aside__titulo">
            <h3 className="text-dark text-center">Universidades</h3>
            <Table striped border hover responsive size="sm">
                <thead>
                    <tr>
                        <th>
                            Alias
                        </th>
                        <th>
                            Nombre
                        </th>
                    </tr>
                </thead>
            </Table>
        </aside>
    );
}

export default SideBar;