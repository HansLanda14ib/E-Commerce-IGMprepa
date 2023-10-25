import React from 'react'
import {GiCompass, GiDiamondHard, GiStabbedNote} from 'react-icons/gi'

export const links = [
    {
        id: 1,
        text: 'home',
        url: '/',
    },
    {
        id: 2,
        text: 'about',
        url: '/about',
    },
    {
        id: 3,
        text: 'products',
        url: '/products',
    },
]

export const services = [
    {
        id: 1,
        icon: <GiCompass/>,
        title: 'Our results',
        text: 'Today, out of 10 students enrolled at Ibn Ghazi Centers, 8 successfully secure admission into a leading Engineering school, and 9 enter a top-tier Business and Management School, compared to 6 out of 10 a decade ago'
    },
    {
        id: 2,
        icon: <GiDiamondHard/>,
        title: 'Why Ibn Ghazi',
        text:
            'Elevate your journey by becoming part of the largest Preparatory school community in Morocco. Experience independent living in one of our boarding facilities and leverage our international partnerships and parallel admission pathways for a unique learning experience',
    },
    {
        id: 3,
        icon: <GiStabbedNote/>,
        title: 'history',
        text:
            'With an illustrious history spanning over two decades, our school has left an indelible mark on the educational landscape, enriching young minds in cities such as Marrakesh, Fes, Meknes, Casablanca, and Rabat. Boasting a vibrant community of over 1400 students, we have continually fostered a culture of academic excellence and holistic growth, shaping the leaders of tomorrow.'
    },
]

export const defaultColors = [
    { name: 'Red', code: '#ff0000' },
    { name: 'Green', code: '#00ff00' },
    { name: 'Blue', code: '#0000ff' },
    { name: 'Yellow', code: '#ffff00' },
    { name: 'Purple', code: '#800080' },
    { name: 'Cyan', code: '#00ffff' },
    { name: 'Magenta', code: '#ff00ff' },
    { name: 'Orange', code: '#ffa500' },
    // Add more colors as needed
];
//export  const products_url = 'https://igmprepa-store.onrender.com/api/v1/products'
//export const single_product_url = `https://igmprepa-store.onrender.com/api/v1/products/`

export const products_url = '/api/v1/products'
export const single_product_url = `/api/v1/products/`