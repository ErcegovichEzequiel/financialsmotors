import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../src/Fetching/firebase-config'
import '../Styles/Pantalla.css'
import Footer from '../Components/Footer';

const Pantalla = () => {
    const [vendedores, setVendedores] = useState([]);
    const [mejorVendedor, setMejorVendedor] = useState(null);

    useEffect(() => {
        const vendedoresRef = collection(db, 'vendedores');
        getDocs(vendedoresRef)
            .then((resp) => {
                const vendedoresData = resp.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setVendedores(vendedoresData);
                if (vendedoresData.length > 0) {
                    const mejor = vendedoresData.reduce((max, vendedor) =>
                        vendedor.Ventas > max.Ventas ? vendedor : max, vendedoresData[0]);
                    setMejorVendedor(mejor);
                }
            })
    }, [])

    return (
        <>
            <Navbar />
            <div className='pantallaContainer'>
                <div className='mejorVendedorContainer'>
                    <img src="./img/Corona.png" alt="Corona" className='corona' />
                    {mejorVendedor ? (
                        <div className='vendedoresCard' key={mejorVendedor.id}>
                            <h3>{mejorVendedor.Nombre} {mejorVendedor.Apellido}</h3>
                            <img className='mejorVendedorImg' src={mejorVendedor.Foto} alt="" />
                            <p>{mejorVendedor.Ventas}</p>
                        </div>
                    ) : ("Cargando el mejor vendedor...")}
                </div>
                <div className='vendedoresCardsContainer'>
                    {
                        vendedores.map((vendedor) => {
                            return (
                                <div className='vendedoresCardTodos' key={vendedor.id}>
                                    <h3 className='vendedorName'>{vendedor.Nombre} {vendedor.Apellido}</h3>
                                    <img className='vendedorImg' src={vendedor.Foto} alt="" />
                                    <p>{vendedor.Ventas}</p>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            <Footer />
        </>
    );

}

export default Pantalla;
