export default function House({params}: {params: {num: string}}) {
    return (
        <div>
            <h1>House Page</h1>
            <p>House Number: {params.num}</p> {/*动态路由参数 */}
        </div>
    )
}