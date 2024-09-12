import React, { useEffect, useState } from 'react';
import ProductCard from './Product';
import Sidebar from './Sidebar';
import { productList, storeProduct, stores } from '../ultils/data';
import Filter from './Filter';

const StoreMenu = () => {
    const [selectedToppings, setSelectedToppings] = useState([]);
    const [sortedBy, setSortedBy] = useState("name-asc");
    const [isOpenFilter, setIsOpenFilter] = useState(false);
    const [selectedStore, setSelectedStore] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleSortChange = (e) => {
        const sortValue = e.target.value;
        setSortedBy(sortValue);

        let sortedProducts;
        if (sortValue === "name-asc") {
            sortedProducts = [...filteredProducts].sort((a, b) =>
                a.name.localeCompare(b.name)
            );
        } else if (sortValue === "name-dsc") {
            sortedProducts = [...filteredProducts].sort((a, b) =>
                b.name.localeCompare(a.name)
            );
        } else if (sortValue === "price-asc") {
            sortedProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
        } else if (sortValue === "price-dsc") {
            sortedProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(sortedProducts);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        let filteredProducts = storeProduct.filter(
            (item) => item["shop"] === selectedStore
        );

        const data = productList?.filter((product) =>
            filteredProducts?.find((p) => product.id === p.product)
        );

        if (selectedToppings.length > 0) {
            const filteredByToppings = data.filter((product) =>
                selectedToppings.every((topping) =>
                    product.toppings.split(',').some((productTopping) => productTopping.toLowerCase().trim() === topping.toLowerCase())
                )
            );
            setFilteredProducts(filteredByToppings);
        } else {
            setFilteredProducts(data);
        }
    }, [selectedStore, selectedToppings]);

    return (
        <div className="store-menu-container">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} setSelectedStore={setSelectedStore} setIsOpen={setIsSidebarOpen} />
            <div className="main-content">
                <div className="menu-header">
                    <h1>{stores.find(store => store.id === selectedStore).name} Menu</h1>
                    <div className="filter-sort">
                        <button onClick={() => setIsOpenFilter(!isOpenFilter)} className="filter-btn">Filter</button>
                        <div className="sort-section">
                            <label htmlFor="sort">Sort By</label>
                            <select id="sort" onChange={handleSortChange}>
                                <option value="name-asc">Name asc</option>
                                <option value="name-dsc">Name desc</option>
                                <option value="price-asc">Price asc</option>
                                <option value="price-dsc">Price desc</option>
                            </select>
                        </div>
                    </div>
                    {isOpenFilter && <Filter setSelectedToppings={setSelectedToppings} selectedToppings={selectedToppings} />}
                </div>
                <div className="product-list">
                    {filteredProducts?.length > 0 ? filteredProducts?.map((product) => {
                        return (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                toppings={product.toppings}
                                trending={product.id === 1}
                            />
                        );
                    }) : <h2> No Data</h2>}
                </div>
            </div>
        </div>
    );
};

export default StoreMenu;
