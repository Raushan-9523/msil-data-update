import React, { useState } from "react";

function GetData() {
  const [arr, setArr] = useState([
    { id: 1, age: 23, name: "rtr", isEdit: false },
    { id: 2, age: 23, name: "skt", isEdit: false },
  ]);

  const handleEdit = (id) => {
    setArr((pre) =>
      pre.map((item) => (item.id === id ? { ...item, isEdit: true } : item)),
    );
  };

  const handleChange = (id, key, value) => {
    setArr((pre) =>
      pre.map((item) => (item.id === id ? { ...item, [key]: value } : item)),
    );
  };

  const handleUpdate = async (item) => {
    try {
      const response = await fetch(`{BACKEND_URL}/update/${item.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: item.name,
          age: item.age,
        }),
      });

      if (response.ok) {
        setArr((pre) =>
          pre.map((i) => (i.id === item.id ? { ...i, isEdit: false } : i)),
        );
        alert("Updated Successfully ✅");
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  return (
    <div>
      <ul>
        {arr.map((item) => (
          <li key={item.id}>
            {item.isEdit ? (
              <>
                <input
                  value={item.name}
                  onChange={(e) =>
                    handleChange(item.id, "name", e.target.value)
                  }
                />
                <input
                  type="number"
                  value={item.age}
                  onChange={(e) => handleChange(item.id, "age", e.target.value)}
                />
                <button onClick={() => handleUpdate(item)}>Save</button>
              </>
            ) : (
              <>
                {item.name} - {item.age}
                <button onClick={() => handleEdit(item.id)}>Update</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetData;
