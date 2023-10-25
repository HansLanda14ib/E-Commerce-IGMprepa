import {IoBarChartSharp} from 'react-icons/io5'
import {MdQueryStats,MdProductionQuantityLimits} from 'react-icons/md'

import { FaUsers} from 'react-icons/fa'
import {ImProfile} from 'react-icons/im'

const links = [
    {id: 1, text: 'Stats', path: 'stats', icon: <IoBarChartSharp/>},
    {id: 2, text: 'All products', path: 'all-products', icon: <MdQueryStats/>},
    {id: 3, text: 'Add product', path: 'add-product', icon: <MdProductionQuantityLimits/>},
    {id: 2, text: 'Clients', path: 'clients', icon: <FaUsers/>},
    {id: 4, text: 'Profile', path: 'profile', icon: <ImProfile/>},
]

export default links
