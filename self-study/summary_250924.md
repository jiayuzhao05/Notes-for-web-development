### Angular

Google维护的前端框架（TypeScript 编写），用于构建大型、可维护的单页应用（SPA）与企业级应用。强调结构化、强类型、依赖注入与完整生态。

- Component（组件）：UI 的基本单位。由 TypeScript 类 + HTML 模板 + CSS 组成。

- Module（模块）：功能聚合单元，根模块为 AppModule，按特性切分（如 UserModule）。

- Template & Data Binding（模板与数据绑定）：

- 插值 {{ }}、属性绑定 [prop]、事件绑定 (event)、双向绑定 [(ngModel)]。

- Directive（指令）：为元素添加行为。结构指令（*ngIf、*ngFor）、属性指令（[ngClass]）。

- Service（服务）与 DI（依赖注入）：业务逻辑复用与解耦，通过构造函数注入。

- Routing（路由）：RouterModule 管理页面导航，支持守卫、懒加载。

- Forms（表单）：模板驱动表单与响应式表单（FormControl/FormGroup）。

- HttpClient：基于 RxJS 的 HTTP 请求，返回 Observable。

- RxJS/Observable：响应式编程，流式处理事件/数据。

- Lifecycle Hooks（生命周期）：如 ngOnInit、ngOnDestroy 等。

- Change Detection（变更检测）：默认策略与 OnPush 优化。

- Angular CLI：ng new/build/serve/generate，脚手架与构建工具。



何时选择angular?

- 大型团队/企业项目：需要统一规范、强类型、内置路由/表单/HTTP/DI 的“一体化方案”。

- 长周期维护：CLI、严格结构和 AOT 构建便于持续迭代与优化。



### Laravel

PHP 的现代 Web 框架（MVC），强调优雅、约定优于配置与开发效率。自带路由、ORM、模板、队列、事件、任务调度、认证/授权、缓存等完整生态。

- 路由 Router：声明式定义请求到控制器/闭包。

- 控制器 Controller：承载业务逻辑，返回视图或 JSON。

- Eloquent ORM：面向对象操作数据库（Active Record），关系、作用域、访问器/修改器。

- 迁移 Migrations & Seeder：数据库版本管理与初始化数据。

- Blade 模板：轻量模板语法，组件/布局/插槽。

- 中间件 Middleware：请求前后拦截（认证、限流、CORS）。

- 服务容器 & 依赖注入：解耦与可测试性。

- 队列/任务/事件：异步处理与解耦（Redis/Beanstalkd/SQS）。

- 认证/授权：laravel/ui、Breeze、Jetstream，Gate/Policy。

- 缓存/会话：多驱动（file/redis/memcached）。

- 调度 Scheduler：基于 php artisan schedule:run 的 Cron 管理。

- Artisan CLI：代码生成、迁移、队列、tinker。



**路由**

// routes/web.php

Route::get('/hello', fn() => 'Hello Laravel');

Route::get('/users/{id}', [UserController::class, 'show']);



**控制器**

// app/Http/Controllers/UserController.php

class UserController extends Controller {

 public function show(User $user) { return view('users.show', compact('user')); }

}



**模型与迁移**

// app/Models/User.php

class User extends Model { protected $fillable = ['name','email']; }

// database/migrations/xxxx_create_users_table.php -> Schema::create(...)



**blade**

```
{{-- resources/views/users/show.blade.php --}}
<x-layout>
  <h1>{{ $user->name }}</h1>
</x-layout>
```



**常用命令**

- composer create-project laravel/laravel app

- php artisan serve

- php artisan make:model Post -mcr（模型+迁移+控制器+资源）

- php artisan migrate, php artisan tinker, php artisan queue:work



使用场景：中大型 CRUD/后台管理/REST API/电商/SaaS。团队需要“开箱即用”的全家桶与稳定生态时优先选择。



### Epic Systems

- 医疗软件公司，核心产品是电子病历系统 EHR/EMR（Epic Hyperspace/Chronicles/Caché/InterSystems IRIS）。

- 典型功能：患者注册、门诊/住院医嘱、药品开立、护理记录、手术、计费与医保对接、临床决策支持、患者门户、互联互通（HL7/FHIR）。

- 特色：高度集成的一体化套件、强定制与工作流引擎、严格的安全合规（HIPAA）、大型医院集团常用。

- 技术生态关键词：HL7 v2/FHIR、接口引擎、单点登录、审计与合规、报告/BI（Clarity/Caboodle）。

### Terraform

- HashiCorp 的基础设施即代码（IaC）工具，用声明式 HCL 配置来创建/变更/销毁云与本地资源。

- 工作原理：terraform init/plan/apply → 读取配置和 State，生成执行计划，调用各云厂商 Provider（AWS/Azure/GCP/K8s/VMware/Datadog 等）管理资源。

- 优势：可版本化、可审计、可复现、可组合（modules）、跨云统一语法、幂等与变更可见性（plan）。

- 关键概念：providers、resources、data sources、variables、outputs、modules、remote state、workspaces、lifecycle。

- 常见用法：创建 VPC/子网/安全组、EKS/AKS 集群、RDS/Cloud SQL、负载均衡、DNS/CDN、监控报警、与 CI/CD 集成。

### 二者关系与场景

- Epic Systems 是医疗业务应用套件；Terraform 是通用基础设施编排工具。

- 在医院/医疗云场景：可用 Terraform 编排承载 Epic 的计算/网络/存储基础设施、周边监控与备份；Epic 应用层通过其自有工具与接口配置临床工作流与数据交换。



### .NET Framework 

微软的 Windows 专用运行时与类库平台（2002 起），为托管语言（C#/VB/F#）提供统一运行环境与丰富库。现已进入维护期，最新主线为 4.8/4.8.1；新开发建议使用跨平台的“.NET”（.NET 6/7/8…）。



- CLR（Common Language Runtime）：托管运行时，负责 JIT 编译（IL→机器码）、内存管理与垃圾回收（GC）、异常处理、线程与并发、安全（Code Access Security, 暂历史）。

- BCL/FCL（基类/框架类库）：数据结构、IO、网络、序列化、反射等通用库。

- CTS/CLS：公共类型系统与语言规范，确保多语言互操作。

- 程序集与元数据：assembly（.dll/.exe，含 IL 与元数据），强名称可放入 GAC（全局程序集缓存）。

- AppDomain：应用域隔离（.NET Framework 时代的进程内隔离机制）。



开发模型

- 桌面：WinForms、WPF（Windows UI）。

- Web：ASP.NET（System.Web，IIS 托管，WebForms/MVC 中早期版本）。

- 通信：WCF；工作流：WF。

- 数据：ADO.NET、Entity Framework（早期版本）。



运行和部署

Web 通常托管于 IIS；桌面为本地安装或 ClickOnce；共享库可安装到 GAC。配置常用 app.config/web.config



和.net区别

- 平台：Framework 仅 Windows；“.NET” 跨平台（Windows/Linux/macOS）。

- 性能/容器化：新“.NET”更快、原生容器友好、自包含发布、单文件、AOT（部分）。

- Web 栈：ASP.NET Core（Kestrel 中间件模型）取代旧 System.Web。

- 状态：.NET Framework 4.8.x 为“最后的主版本”，仅安全与兼容性更新；新特性主要在“.NET”发布。



### 何时仍用 .NET Framework

- 维护既有的 WinForms/WPF/ASP.NET（System.Web）/WCF 旧系统，需与老 COM/企业组件深整合且仅面向 Windows。