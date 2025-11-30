import React from 'react'
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className='text-center py-10'>


<h1 className='text-4xl font-bold'>Welcome to BookBridge 📚</h1>
<p className='mt-4 text-lg'>Donate your unused books & help someone learn.</p>

<div className='mt-6 flex justify-center gap-5'>

<Link className='px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700'
 to ="/donate">
Donate Book
</Link>

<Link className='px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700'
 to = "/request">
Request Book
</Link>

</div>



    </div>
  );
};

export default Home;