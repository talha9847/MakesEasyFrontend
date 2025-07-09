import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const Try = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showForm, setShowForm] = useState(false);
  const [role, setRole] = useState([]);

  const onSubmit = async (data) => {
    var form = new FormData();
    form.append("identifier", data.email);
    form.append("password", data.password);

    const reg = await axios.post("http://localhost:5169/api/User/Login", form);
    console.log(reg.data.token);
    localStorage.setItem("token", reg.data.token);

    if (reg.data.role == "Admin2") {
      setRole(["As Village", "As Taluka"]);
      setShowForm(true);
    }
    if (reg.data.role == "Admin3") {
      setRole(["As Village", "As Taluka", "As District"]);
      setShowForm(true);
    }
  };

  const roleClicked = async (ans) => {
    let token = localStorage.getItem("token");
    console.log(token);
    let form = new FormData();

    form.append("role", "Admin1");
    form.append("tempToken", token);
    if (ans == "As Village") {
      const result = await axios.post(
        "http://localhost:5169/api/User/SetScope",
        form
      );
      if (result.status == 200) {
        console.log(result.data)
      }
    }
    if (ans == "As Taluka") {
      console.log("Admin2");
    } else {
      console.log("Admin3");
    }
  };
  return (
    <div>
      <form className="m-10" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            {...register("email", { required: "Email is required" })}
            className="border-2 border-black"
            type="text"
            name="email"
            id="email"
          />
        </div>

        <div>
          <input
            {...register("password", { required: "Email is required" })}
            className="border-2 border-black"
            type="text"
            name="password"
            id="password"
          />
        </div>
        <div>
          <button className="border-2 border-black px-3" type="submit">
            Login
          </button>
        </div>
      </form>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div>
            <form>
              {role.map((c, i) => (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    roleClicked(c);
                  }}
                  key={i}
                  className="bg-black px-3 text-white"
                >
                  {c}
                </button>
              ))}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Try;
