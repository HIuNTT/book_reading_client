import StarIcon from '/img/star_icon.png'


const Feedback = () => {
  return (
    <div className="mt-5 mb-10">
      <div className="text-white py-4 px-6 rounded-xl bg-[#262729]">
        <div className="flex items-center">
          <div className="mr-10">
            <h5 className="font-bold text-[50px] text-white">5.0</h5>
            <p className="text-white text-[16px]">20 danh gia</p>
          </div>
        </div>
        <div className=" mt-[30px] p-6 mb-[10px] bg-[#3c3f43] rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="" alt="" className="w-[42px] h-[42px] rounded-full object-cover bg-slate-400" />
              <h5 className="text-white">Tên tác giả</h5>
            </div>
            <div className="text-white">
              Ngày cập nhật
            </div>
          </div>
          <div className="pl-14 flex items-center justify-between text-[16px] text-white mt-2">
            <span>Comment</span>
            <img className='w-4 h-6' src={StarIcon}></img>
          </div>
        </div>
        <div className=" mt-[30px] p-6 mb-[10px] bg-[#3c3f43] rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="" alt="" className="w-[42px] h-[42px] rounded-full object-cover bg-slate-400" />
              <h5 className="text-white">Tên tác giả</h5>
            </div>
            <div className="text-white">
              Ngày cập nhật
            </div>
          </div>
          <div className="pl-14 flex items-center justify-between text-[16px] text-white mt-2">
            <span>Comment</span>
            <img className='w-4 h-6' src={StarIcon}></img>
          </div>
        </div>
        <div className=" mt-[30px] p-6 mb-[10px] bg-[#3c3f43] rounded-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="" alt="" className="w-[42px] h-[42px] rounded-full object-cover bg-slate-400" />
              <h5 className="text-white">Tên tác giả</h5>
            </div>
            <div className="text-white">
              Ngày cập nhật
            </div>
          </div>
          <div className="pl-14 flex items-center justify-between text-[16px] text-white mt-2">
            <span>Comment</span>
            <img className='w-4 h-6' src={StarIcon}></img>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Feedback