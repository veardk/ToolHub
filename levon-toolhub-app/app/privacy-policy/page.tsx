"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPolicyPage() {
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
            <h1 className="text-3xl font-bold">隐私政策</h1>
          </div>
          
          <div className="prose prose-blue dark:prose-invert max-w-none">
            <p className="text-gray-500 dark:text-gray-400">
              最后更新日期：{new Date().toISOString().split('T')[0]}
            </p>
            
            <h2>1. 引言</h2>
            <p>
              ToolHub（"我们"、"我们的"、"本网站"）重视您的隐私。本隐私政策旨在向您说明我们如何收集、使用、披露和保护您的个人信息。
              通过使用我们的服务，您同意本隐私政策中描述的数据实践。
            </p>
            
            <h2>2. 我们收集的信息</h2>
            <h3>2.1 您直接提供给我们的信息</h3>
            <p>
              当您注册账户、完成个人资料、提交工具、发表评论或与我们的客户服务团队联系时，我们会收集以下类型的信息：
            </p>
            <ul>
              <li>身份信息：如姓名、用户名</li>
              <li>联系信息：如电子邮件地址</li>
              <li>账户信息：如密码（以加密形式存储）</li>
              <li>个人资料信息：如个人简介、专业领域、头像</li>
              <li>您提交的内容：如评论、评价、工具提交信息</li>
            </ul>
            
            <h3>2.2 自动收集的信息</h3>
            <p>
              当您访问或使用我们的服务时，我们可能会自动收集某些信息，包括：
            </p>
            <ul>
              <li>设备信息：如IP地址、浏览器类型、操作系统</li>
              <li>使用数据：如您访问的页面、点击的链接、访问时间</li>
              <li>Cookie和类似技术收集的信息（详见我们的Cookie政策）</li>
            </ul>
            
            <h2>3. 我们如何使用您的信息</h2>
            <p>我们使用收集到的信息用于以下目的：</p>
            <ul>
              <li>提供、维护和改进我们的服务</li>
              <li>处理和完成交易</li>
              <li>管理用户账户</li>
              <li>发送服务相关通知</li>
              <li>回应您的请求和询问</li>
              <li>发送营销和推广信息（如果您同意接收此类信息）</li>
              <li>防止欺诈和滥用</li>
              <li>分析使用模式以改进用户体验</li>
              <li>遵守法律义务</li>
            </ul>
            
            <h2>4. 信息共享和披露</h2>
            <p>我们不会出售或出租您的个人信息。我们可能在以下情况下共享您的信息：</p>
            <ul>
              <li>
                <strong>服务提供商：</strong>
                我们可能与帮助我们提供服务的第三方服务提供商共享您的信息，如托管服务、分析服务和客户支持服务。
              </li>
              <li>
                <strong>法律要求：</strong>
                如果法律要求或为了响应合法程序（如搜查令或法院命令），我们可能会披露您的信息。
              </li>
              <li>
                <strong>保护权利：</strong>
                在我们认为有必要调查、预防或采取行动以应对非法活动、可疑欺诈、涉及潜在对任何人身安全的威胁或违反我们的服务条款的情况下，我们可能会披露信息。
              </li>
              <li>
                <strong>业务转让：</strong>
                如果我们参与合并、收购或资产出售，您的信息可能会作为交易的一部分被转让。
              </li>
              <li>
                <strong>经您同意：</strong>
                在您同意的情况下，我们可能会以本政策未描述的方式共享您的信息。
              </li>
            </ul>
            
            <h2>5. 数据安全</h2>
            <p>
              我们采取合理的技术和组织措施来保护您的个人信息免受未经授权的访问、使用或披露。
              然而，请注意，没有任何传输或存储方法是100%安全的。
              我们致力于保护您的个人信息，但不能保证其绝对安全。
            </p>
            
            <h2>6. 数据保留</h2>
            <p>
              我们仅在实现本隐私政策中所述目的所需的时间内保留您的个人信息，除非法律要求或允许更长的保留期。
              当您删除账户时，我们会尽快删除或匿名化您的个人信息，除非我们需要保留某些信息以遵守法律义务、解决争议或执行我们的协议。
            </p>
            
            <h2>7. 您的权利</h2>
            <p>根据适用的数据保护法律，您可能有以下权利：</p>
            <ul>
              <li>访问您的个人信息</li>
              <li>更正不准确的信息</li>
              <li>删除您的信息</li>
              <li>限制或反对处理</li>
              <li>数据可携性</li>
              <li>撤回同意</li>
            </ul>
            <p>
              要行使这些权利，请通过本政策末尾提供的联系方式与我们联系。
              我们将在合理时间内回应您的请求，遵循适用的数据保护法律。
            </p>
            
            <h2>8. 儿童隐私</h2>
            <p>
              我们的服务不面向13岁以下的儿童。我们不会故意收集或请求13岁以下儿童的个人信息。
              如果我们获悉我们收集了13岁以下儿童的个人信息，我们将尽快删除这些信息。
              如果您认为我们可能拥有来自13岁以下儿童的信息，请通过以下联系方式联系我们。
            </p>
            
            <h2>9. 第三方链接</h2>
            <p>
              我们的服务可能包含指向第三方网站、应用程序或服务的链接。我们不对这些第三方的隐私做法负责，建议您查看这些第三方的隐私政策。
            </p>
            
            <h2>10. 隐私政策变更</h2>
            <p>
              我们可能会不时修改或更新本隐私政策。修改后的版本将在本页面上发布。
              我们鼓励您定期查看本隐私政策，以了解我们如何保护您的信息。
              继续使用我们的服务将视为您接受任何修改后的政策。
            </p>
            
            <h2>11. 联系我们</h2>
            <p>
              如果您对本隐私政策有任何问题、意见或请求，请通过以下方式联系我们：
            </p>
            <ul>
              <li>电子邮件：privacy@toolhub.com</li>
              <li>地址：北京市海淀区中关村大街1号，创新大厦10层1001室</li>
              <li>电话：+86-10-XXXX-XXXX</li>
            </ul>
            <p>
              我们致力于公平解决任何关于我们隐私实践的投诉或疑虑。
            </p>
          </div>
          
          <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-6">
            <div className="flex justify-between items-center">
              <Button variant="outline" asChild>
                <Link href="/">返回首页</Link>
              </Button>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/terms-of-service">服务条款</Link>
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