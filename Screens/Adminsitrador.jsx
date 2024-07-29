import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar';
import { collection, getDocs, updateDoc, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../src/Fetching/firebase-config'
import '../Styles/Administrador.css'
import Footer from '../Components/Footer';

const Administrador = () => {
    const [vendedores, setVendedores] = useState([]);
    const [mejorVendedor, setMejorVendedor] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showDeleteForm, setShowDeleteForm] = useState(false);
    const [newVendedor, setNewVendedor] = useState({ Nombre: '', Apellido: '', Foto: '', Ventas: 0 });
    const [deleteId, setDeleteId] = useState('');

    useEffect(() => {
        fetchVendedores();
    }, []);

    const fetchVendedores = async () => {
        const vendedoresRef = collection(db, 'vendedores');
        const resp = await getDocs(vendedoresRef);
        const vendedoresData = resp.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
        }));
        setVendedores(vendedoresData);
        if (vendedoresData.length > 0) {
            const mejor = vendedoresData.reduce((max, vendedor) =>
                vendedor.Ventas > max.Ventas ? vendedor : max, vendedoresData[0]);
            setMejorVendedor(mejor);
        }
    };

    const handleIncrement = async (id, currentVentas) => {
        const vendedorRef = doc(db, 'vendedores', id);
        await updateDoc(vendedorRef, {
            Ventas: currentVentas + 1
        });
        setVendedores(vendedores.map(vendedor =>
            vendedor.id === id ? { ...vendedor, Ventas: vendedor.Ventas + 1 } : vendedor
        ));
        updateMejorVendedor();
    };

    const handleDecrement = async (id, currentVentas) => {
        if (currentVentas > 0) {
            const vendedorRef = doc(db, 'vendedores', id);
            await updateDoc(vendedorRef, {
                Ventas: currentVentas - 1
            });
            setVendedores(vendedores.map(vendedor =>
                vendedor.id === id ? { ...vendedor, Ventas: vendedor.Ventas - 1 } : vendedor
            ));
            updateMejorVendedor();
        }
    };

    const updateMejorVendedor = () => {
        if (vendedores.length > 0) {
            const mejor = vendedores.reduce((max, vendedor) =>
                vendedor.Ventas > max.Ventas ? vendedor : max, vendedores[0]);
            setMejorVendedor(mejor);
        }
    };

    const handleAddVendedor = async () => {
        const vendedoresRef = collection(db, 'vendedores');
        await addDoc(vendedoresRef, newVendedor);
        setNewVendedor({ Nombre: '', Apellido: '', Foto: '', Ventas: 0 });
        setShowAddForm(false);
        fetchVendedores();
    };

    const handleDeleteVendedor = async () => {
        const vendedorRef = doc(db, 'vendedores', deleteId);
        await deleteDoc(vendedorRef);
        setDeleteId('');
        setShowDeleteForm(false);
        fetchVendedores();
    };

    return (
        <>
            <Navbar />
            <div className='adminsitradorContainer'>
                <div className='mejorVendedorContainer'>
                <img src="./img/Corona.png" alt="Corona" className='corona' />
                    {mejorVendedor ? (
                        <div className='mejorVendedor' key={mejorVendedor.id}>
                            <h3>{mejorVendedor.Nombre} {mejorVendedor.Apellido}</h3>
                            <img className='mejorVendedorImg' src={mejorVendedor.Foto} alt="Mejor Vendedor" />
                            <p>{mejorVendedor.Ventas}</p>
                        </div>
                    ) : (
                        "Cargando el mejor vendedor..."
                    )}
                </div>
                <div className='vendedoresCardsContainer'>
                    {
                        vendedores.map((vendedor) => (
                            <div className='vendedoresCardTodos' key={vendedor.id}>
                                <h3 className='vendedorName'>{vendedor.Nombre} {vendedor.Apellido}</h3>
                                <p className='vendedorID'>ID del Vendedor: {vendedor.id}</p>
                                <img className='vendedorImg' src={vendedor.Foto} alt="Vendedor" />
                                <p>{vendedor.Ventas}</p>
                                <button className='vendedorButton' onClick={() => handleDecrement(vendedor.id, vendedor.Ventas)}>-</button>
                                <button className='vendedorButton' onClick={() => handleIncrement(vendedor.id, vendedor.Ventas)}>+</button>
                            </div>
                        ))
                    }
                </div>
                <div className='controlButtons'>
                    <button className='buttonsTools' onClick={() => setShowAddForm(!showAddForm)}>Agregar Vendedor</button>
                    <button className='buttonsTools' onClick={() => setShowDeleteForm(!showDeleteForm)}>Eliminar Vendedor</button>
                </div>
                {showAddForm && (
                    <div className='addVendedorForm'>
                        <h3>Agregar Nuevo Vendedor</h3>
                        <input
                            type='text'
                            placeholder='Nombre'
                            value={newVendedor.Nombre}
                            onChange={(e) => setNewVendedor({ ...newVendedor, Nombre: e.target.value })}
                        />
                        <input
                            type='text'
                            placeholder='Apellido'
                            value={newVendedor.Apellido}
                            onChange={(e) => setNewVendedor({ ...newVendedor, Apellido: e.target.value })}
                        />
                        <input
                            type='text'
                            placeholder='URL de la Foto'
                            value={newVendedor.Foto}
                            onChange={(e) => setNewVendedor({ ...newVendedor, Foto: e.target.value })}
                        />
                        <input
                            type='number'
                            placeholder='Ventas'
                            value={newVendedor.Ventas}
                            onChange={(e) => setNewVendedor({ ...newVendedor, Ventas: Number(e.target.value) })}
                        />
                        <button onClick={handleAddVendedor}>Agregar</button>
                    </div>
                )}
                {showDeleteForm && (
                    <div className='deleteVendedorForm'>
                        <h3>Eliminar Vendedor</h3>
                        <input
                            type='text'
                            placeholder='ID del Vendedor'
                            value={deleteId}
                            onChange={(e) => setDeleteId(e.target.value)}
                        />
                        <button onClick={handleDeleteVendedor}>Eliminar</button>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}


export default Administrador;
