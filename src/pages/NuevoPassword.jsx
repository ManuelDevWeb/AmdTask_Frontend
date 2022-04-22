const NuevoPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-5xl md:text-6xl capitalize">
        Reestablece tu password y no pierdas tus{" "}
        <span className="text-slate-700">proyectos</span>
      </h1>

      <form className="my-10 bg-white shadow rounded-lg p-10">
        {/* Password */}
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Nuevo Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Escribe tu Nuevo Password"
            className="w-full mt-2 p-3 border rounded-xl bg-gray-50  focus:outline-sky-700"
          />
        </div>

        <input
          type="submit"
          value="Guardar Nuevo Password"
          className="w-full bg-sky-700 py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </>
  );
};

export default NuevoPassword;
