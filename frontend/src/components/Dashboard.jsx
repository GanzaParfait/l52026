function Dashboard() {
  return (
    <>
      <div className="cards flex flex-row gap-2 w-full justify-between">
        <div className="bg-gray-900 text-white p-6 rounded w-full">
          <p>Total Products</p>
          <span className="text-[22px] font-bold">45+</span>
        </div>
        <div className="bg-gray-900 text-white p-6 rounded w-full">
          <p>Total Products</p>
          <span className="text-[22px] font-bold">45+</span>
        </div>
        <div className="bg-gray-900 text-white p-6 rounded w-full">
          <p>Total Products</p>
          <span className="text-[22px] font-bold">45+</span>
        </div>
        <div className="bg-gray-900 text-white p-6 rounded w-full">
          <p>Total Products</p>
          <span className="text-[22px] font-bold">45+</span>
        </div>
      </div>

      <div className="preview mt-4">
        <h2 className="font-bold text-[25px] pb-5">Today's Sales</h2>

        <div className="table-responsive">
          <table className="w-full bg-white rounded-xl">
            <thead className="bg-gray-900 text-white text-left">
              <th className="p-4">#</th>
              <th className="p-4">Cost</th>
              <th className="p-4">Price</th>
              <th className="p-4">Quantity</th>
              <th className="p-4">Profit</th>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-100 cursor-pointer transition-all duration-3 ease-in-out">
                <td className="p-4">01</td>
                <td className="p-4">25,500 RWF</td>
                <td className="p-4">35,500 RWF</td>
                <td className="p-4">2</td>
                <td className="p-4">+12,000 RWF</td>
              </tr>
              <tr className="hover:bg-gray-100 cursor-pointer transition-all duration-3 ease-in-out">
                <td className="p-4">02</td>
                <td className="p-4">25,500 RWF</td>
                <td className="p-4">35,500 RWF</td>
                <td className="p-4">2</td>
                <td className="p-4">+12,000 RWF</td>
              </tr>
              <tr className="hover:bg-gray-100 cursor-pointer transition-all duration-3 ease-in-out">
                <td className="p-4">03</td>
                <td className="p-4">25,500 RWF</td>
                <td className="p-4">35,500 RWF</td>
                <td className="p-4">2</td>
                <td className="p-4">+12,000 RWF</td>
              </tr>
              <tr className="hover:bg-gray-100 cursor-pointer transition-all duration-3 ease-in-out">
                <td className="p-4">04</td>
                <td className="p-4">25,500 RWF</td>
                <td className="p-4">35,500 RWF</td>
                <td className="p-4">2</td>
                <td className="p-4">+12,000 RWF</td>
              </tr>
              <tr className="hover:bg-gray-100 cursor-pointer transition-all duration-3 ease-in-out">
                <td className="p-4">05</td>
                <td className="p-4">25,500 RWF</td>
                <td className="p-4">35,500 RWF</td>
                <td className="p-4">2</td>
                <td className="p-4">+12,000 RWF</td>
              </tr>
              <tr className="hover:bg-gray-100 cursor-pointer transition-all duration-3 ease-in-out">
                <td className="p-4">06</td>
                <td className="p-4">25,500 RWF</td>
                <td className="p-4">35,500 RWF</td>
                <td className="p-4">2</td>
                <td className="p-4">+12,000 RWF</td>
              </tr>
              <tr className="hover:bg-gray-100 cursor-pointer transition-all duration-3 ease-in-out">
                <td className="p-4">07</td>
                <td className="p-4">25,500 RWF</td>
                <td className="p-4">35,500 RWF</td>
                <td className="p-4">2</td>
                <td className="p-4">+12,000 RWF</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
