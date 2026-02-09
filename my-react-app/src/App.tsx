import { useAppQuery } from './hooks/useAppQuery'
import { useAppRouter } from './hooks/useAppRouter'

export const App = () => {
	const { AppQueryProvider } = useAppQuery()
	const { AppRouterProvider } = useAppRouter()
	return (
		<AppQueryProvider> 
			<AppRouterProvider />
		</AppQueryProvider>
        {/*<QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>*/}
	)
}

/*
provider嵌套模式
React Context 的常见用法：外层 Provider 提供上下文，内层组件消费该上下文
children prop：AppQueryProvider 接收 children；<AppRouterProvider /> 作为 children 传入

App 组件
├─ AppQueryProvider (提供 React Query 上下文)
│  └─ QueryClientProvider
│     └─ AppRouterProvider (使用路由)
│        └─ RouterProvider
│           └─ 路由组件（可以使用 useQuery）
*/

