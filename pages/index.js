import React, { useState, useEffect } from 'react';
import { firebase } from '../Firebase/config';

const Index = () => {
  const [itemData, setItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch food data from Firestore
    const db = firebase.firestore();
    const foodsRef = db.collection('foods');

    foodsRef
      .get()
      .then((querySnapshot) => {
        const foods = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          // Assuming there's an 'isAvailable' property in your Firestore documents
          foods.push({ id: doc.id, ...data });
        });
        setItemData(foods);
        setIsLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error('Error getting documents: ', error);
        setIsLoading(false); // Set loading to false even on error
      });
  }, []);

  const toggleAvailability = (index) => {
    const updatedItems = [...itemData];
    const item = updatedItems[index];
    item.isAvailable = !item.isAvailable;
    setItemData(updatedItems);

    // Update Firestore document with the new availability status
    const db = firebase.firestore();
    const foodsRef = db.collection('foods');
    
    // Assuming you have a field 'isAvailable' in your Firestore documents
    foodsRef.doc(item.id).update({ isAvailable: item.isAvailable })
      .then(() => {
        console.log('Document successfully updated!');
      })
      .catch((error) => {
        console.error('Error updating document: ', error);
        // If the update fails, you might want to revert the local state change
        // by fetching the data from Firestore again.
        // This can be handled based on your application's error handling strategy.
      });
  };
  return (
    <div className='min-h-screen bg-white dark:bg-white'>
      <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-f-screen-xl md:px-24 lg:px-8 lg:py-20">
        {isLoading ? (
          <div className="min-h-screen flex items-center justify-center">
           {/*ACUBE CHANAPORA*/}
            <div className="w-80 h-80 border-4 border-dashed rounded-full animate-spin dark:border-violet-800"></div>
          </div>
        ) : (
          <div className="grid row-gap-8 sm:row-gap-0 sm:grid-cols-2 lg:grid-cols-8">
            {itemData.map((item, index) => (
              <div key={item.id} className="p-2 border-b sm:border-r border-red-300">
                <div className="max-w-md text-center">
                  <h6 className="mb-2 font-bold leading-5 text-2xl text-red-500">{item.foodName}</h6>
                  <p className="mb-3 text-2xl text-gray-900">{item.foodPrice}</p>
                  <div className="mt-4 sm:flex sm:items-center sm:justify-between sm:mt-6 sm:-mx-2">
                    <button
                      className={`px-4 sm:mx-2 w-full py-2.5 text-sm font-medium tracking-wide capitalize transition-colors duration-300 transform border rounded-md focus:outline-none focus:ring ${
                        item.isAvailable
                          ? 'bg-green-600 text-white hover:bg-green-500 focus:ring-green-300'
                          : 'bg-red-600 text-white hover:bg-red-500 focus:ring-red-300'
                      }`}
                      onClick={() => toggleAvailability(index)}
                    >
                      {item.isAvailable ? 'Available' : 'Unavailable'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
