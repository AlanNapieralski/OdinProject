import homeImg from '../assets/images/home.jpg'

const Home = () => {

    const desc = [
         'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Minima, accusantium magni ex voluptatum, possimus inventore sapiente error iste itaque, praesentium suscipit ut quia rem recusandae explicabo. Inventore atque adipisci illo velit vel eligendi officiis hic. Accusamus nulla iusto quod ducimus impedit modi repellendus aspernatur quae ad vitae, consequatur quo autem?',
         'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque assumenda eius expedita esse et, culpa suscipit exercitationem sequi cum corrupti sunt delectus, laboriosam molestiae voluptates commodi nemo. Distinctio esse odit perferendis recusandae rem quisquam aliquid nisi dicta ullam nesciunt quasi minima quod laborum doloribus repellendus hic alias, reprehenderit optio voluptatem!',
         'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam maiores porro neque sapiente. Adipisci earum dolorem provident blanditiis animi? Aspernatur doloribus soluta possimus dolor, qui nam ipsam eveniet harum tenetur.'
    ]
    return (
        <div className="flex justify-center items-center">
            <div className='flex flex-col justify-center items-center max-w-[1280px] *:py-2'>
                <h1 className="text-4xl">Enhance Your Shopping</h1>
                <div className='w-3/4 h-[600px]'>
                    <img src={homeImg} alt='some clothing' className='w-full h-full object-cover rounded-lg drop-shadow-2xl' />
                </div>
                {desc.map( (p, index) => (
                    <p key={index} className='leading-6 text-center'>{p}</p>
                ))}
                
            </div>
        </div>
    )
}

export default Home