"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
          <div className="mb-8 flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/">
                <ChevronLeft className="h-5 w-5" />
                <span className="sr-only">返回</span>
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">服务条款</h1>
          </div>
          
          <div className="prose prose-blue dark:prose-invert max-w-none">
            <p className="text-gray-500 dark:text-gray-400">
              最后更新日期：{new Date().toISOString().split('T')[0]}
            </p>
            
            <h2>1. 接受条款</h2>
            <p>
              欢迎使用ToolHub服务（"服务"）。本服务由ToolHub团队（"我们"、"我们的"）提供。通过访问或使用我们的服务，您同意受本服务条款（"条款"）的约束。
              如果您不同意这些条款的任何部分，您可能无法使用我们的服务。
            </p>
            
            <h2>2. 服务描述</h2>
            <p>
              ToolHub是一个工具发现与分享平台，提供各类工具的信息、评价和比较。我们的目标是帮助用户发现和选择最适合其需求的工具。
            </p>
            
            <h2>3. 用户账户</h2>
            <p>
              3.1 注册账户时，您必须提供准确、完整和最新的信息。您有责任维护您账户的安全性，包括保护密码和限制对您计算机的访问。
            </p>
            <p>
              3.2 您接受对通过您的账户发生的所有活动负责，无论这些活动是否得到您的授权。
            </p>
            <p>
              3.3 我们保留在我们认为适当的情况下拒绝服务、终止账户、移除或编辑内容的权利。
            </p>
            
            <h2>4. 用户行为</h2>
            <p>
              4.1 您同意不使用我们的服务进行任何违法或未经授权的目的。
            </p>
            <p>
              4.2 您不得发布、上传或分享任何违法、有害、威胁、辱骂、骚扰、诽谤、侵权或其他不适当的内容。
            </p>
            <p>
              4.3 您不得尝试干扰或破坏服务的安全性或正常运行。
            </p>
            
            <h2>5. 用户提交内容</h2>
            <p>
              5.1 当您向服务提交内容（如评论、评价、工具信息等），您授予我们全球性、非独占性、免版税的许可，允许我们使用、复制、修改、发布、分发和展示此类内容。
            </p>
            <p>
              5.2 您声明并保证您拥有或已获得提交任何内容所需的所有权利、许可和同意。
            </p>
            
            <h2>6. 知识产权</h2>
            <p>
              6.1 本服务及其原始内容、功能和设计受著作权、商标和其他知识产权法律的保护。
            </p>
            <p>
              6.2 未经我们明确许可，您不得复制、修改、创建衍生作品、公开展示、重新发布、下载、存储或传输本服务的任何部分。
            </p>
            
            <h2>7. 第三方链接和工具</h2>
            <p>
              7.1 我们的服务可能包含指向第三方网站或服务的链接，这些网站或服务不受我们控制。
            </p>
            <p>
              7.2 我们对任何第三方网站或服务的内容、隐私政策或做法不负责，也不对其承担任何责任。
            </p>
            <p>
              7.3 您承认并同意，我们不对您使用任何第三方网站或服务可能遭受的任何损害或损失负责。
            </p>
            
            <h2>8. 免责声明</h2>
            <p>
              8.1 本服务按"原样"和"可用"的基础提供，不附带任何明示或暗示的保证。
            </p>
            <p>
              8.2 我们不保证服务将不间断、及时、安全或无错误。
            </p>
            <p>
              8.3 我们不对服务上提供的任何工具的准确性、可靠性、有效性或完整性做出任何保证。
            </p>
            
            <h2>9. 责任限制</h2>
            <p>
              在适用法律允许的最大范围内，ToolHub及其管理者、员工和代理人不对任何间接、偶然、特殊、后果性或惩罚性损害负责。
            </p>
            
            <h2>10. 条款变更</h2>
            <p>
              我们保留随时修改或替换这些条款的权利。修改后的条款将在发布到本网站时生效。您继续使用服务将被视为接受修改后的条款。
            </p>
            
            <h2>11. 适用法律</h2>
            <p>
              这些条款受中华人民共和国法律管辖，并按其解释，不考虑任何法律冲突规定。
            </p>
            
            <h2>12. 联系我们</h2>
            <p>
              如果您对这些条款有任何疑问，请通过以下方式联系我们：
            </p>
            <ul>
              <li>电子邮件：contact@toolhub.com</li>
              <li>地址：北京市海淀区中关村大街1号，创新大厦10层1001室</li>
            </ul>
          </div>
          
          <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex justify-between items-center">
              <Button variant="outline" asChild>
                <Link href="/">返回首页</Link>
              </Button>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/privacy-policy">隐私政策</Link>
                </Button>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/cookie-policy">Cookie政策</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 