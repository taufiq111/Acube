import React, { useState, useEffect } from "react";
import { firebase } from "../Firebase/config";

const EditFood = ({ id, foodName, foodPrice, onCancel, onSave }) => {
  const [editedFoodName, setEditedFoodName] = useState(foodName);
  const [editedFoodPrice, setEditedFoodPrice] = useState(foodPrice);

  const handleSave = () => {
    onSave(id, editedFoodName, editedFoodPrice);
  };

  return (
    <div className="border p-2 mb-2">
      <input
        type="text"
        placeholder="Food Name"
        value={editedFoodName}
        onChange={(e) => setEditedFoodName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Food Price"
        value={editedFoodPrice}
        onChange={(e) => setEditedFoodPrice(e.target.value)}
      />
      <button onClick={handleSave}>Save</button>
      <button className="ml-2" onClick={onCancel}>Cancel</button>
    </div>
  );
};

const AddFood = () => {
  const [foodName, setFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [foodList, setFoodList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingFood, setEditingFood] = useState({});

  useEffect(() => {
    const db = firebase.firestore();
    const foodRef = db.collection("foods");

    const unsubscribe = foodRef.onSnapshot((snapshot) => {
      const data = [];
      snapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      setFoodList(data);
    });

    return () => unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);

    const db = firebase.firestore();
    const foodRef = db.collection("foods");

    const foodData = {
      foodName,
      foodPrice,
    };

    try {
      await foodRef.add(foodData);
      setFoodName("");
      setFoodPrice("");
    } catch (error) {
      console.error("Error adding food: ", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const db = firebase.firestore();
    const foodRef = db.collection("foods").doc(id);

    try {
      await foodRef.delete();
    } catch (error) {
      console.error("Error deleting food: ", error);
    }
  };

  const handleEdit = (food) => {
    setIsEditing(true);
    setEditingFood(food);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingFood({});
  };

  const handleSaveEdit = async (id, editedFoodName, editedFoodPrice) => {
    setIsUploading(true);

    const db = firebase.firestore();
    const foodRef = db.collection("foods").doc(id);

    try {
      await foodRef.update({
        foodName: editedFoodName,
        foodPrice: editedFoodPrice,
      });
    } catch (error) {
      console.error("Error updating food: ", error);
    } finally {
      setIsEditing(false);
      setEditingFood({});
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-white min-h-screen">
      <div className="m-auto  w-full flex items-center justify-center  ">
        <div>
          <h1 className="mb-1 font-bold text-3xl flex gap-1 items-baseline font-mono">
            Add Food Data
          </h1>
       <form onSubmit={handleSubmit}>
            <div className="grid max-w-3xl gap-2 py-10 px-8 sm:grid-cols-2 bg-white rounded-md border-t-4 border-red-300">
              {/* Input field for title */}
              <div className="grid">
                <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
          type="text"
          id="foodName"
          className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:border-indigo-500"
          value={foodName}
          onChange={(e) => setFoodName(e.target.value)}
        />
                  <label
                    htmlFor="foodName"
                    className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                  >
                    Food Name
                  </label>
                </div>
              </div>
            

              {/* Input field for salary */}
              <div className="grid">
                <div className="bg-white flex min-h-[60px] flex-col-reverse justify-center rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:shadow-inner">
                <input
          type="text"
          id="foodPrice"
          className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:border-indigo-500"
          value={foodPrice}
          onChange={(e) => setFoodPrice(e.target.value)}
        />
                  <label
                    htmlFor="foodPrice"
                    className="block transform text-xs font-bold uppercase text-gray-400 transition-opacity, duration-200 peer-placeholder-shown:h-0 peer-placeholder-shown:-translate-y-full peer-placeholder-shown:opacity-0"
                  >
                    Food Price
                  </label>
                </div>
              </div>
              {/* Input field for description */}
              
              <div className="col-span-2">
                <button
                  type="submit"
                  className="w-full mt-4 bg-red-300 text-white py-2 px-6 rounded-md hover:bg-red-300"
                  disabled={isUploading} // Disable the button during loading
                >
                  {isUploading ? 'Uploading...' : 'Submit'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <center><h2>Designed & Developed by <b> <a href="http://www.instagram.com/taufiq_films">Mohammad Taufiq</a> </b> </h2></center>
      {/* Display food list with edit and delete options */}
      <div className="max-w-6xl mx-auto mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {foodList.map((food) =>
          isEditing && editingFood.id === food.id ? (
            <EditFood
              key={food.id}
              id={food.id}
              foodName={food.foodName}
              foodPrice={food.foodPrice}
              onCancel={handleCancelEdit}
              onSave={handleSaveEdit}
            />
          ) : (
            <div
              key={food.id}
              className="bg-white dark:bg-white border rounded-lg shadow-md p-4"
            >
              <p className="text-lg font-semibold">{food.foodName}</p>
              <p className="text-gray-600">${food.foodPrice}</p>
              <div className="flex mt-4">
                <button
                  onClick={() => handleDelete(food.id)}
                  className="mr-2 text-red-500"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleEdit(food)}
                  className="text-blue-500"
                >
                  Edit
                </button>
              </div>
            </div>
          )
        )}
      </div>

    </div>
  );
};

export default AddFood;
