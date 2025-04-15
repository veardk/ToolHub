"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  CheckCircle2, 
  ChevronLeft, 
  Home, 
  Rocket, 
  Calendar, 
  ClipboardCheck,
  Mail,
  LayoutGrid,
  Wrench
} from "lucide-react"

export default function SubmitSuccessPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8f9fa] dark:bg-[#121212] bg-[url('/patterns/dot-pattern.png')] bg-repeat">
      {/* 左上角返回按钮 */}
      <div className="absolute top-4 left-4 z-30">
        <Button variant="ghost" size="sm" className="text-white hover:text-white hover:bg-white/10" asChild>
          <Link href="/tools">
            <ChevronLeft className="mr-1 h-4 w-4" />
            返回工具库
          </Link>
        </Button>
      </div>
      
      {/* 页面标题区 */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/circuit-board.svg')] opacity-10"></div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
            <div className="mb-6 flex justify-center animate-bounce">
              <div className="h-24 w-24 bg-white/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="h-14 w-14 text-white" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up">感谢提交</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-up animation-delay-100">
              您的工具已成功提交，我们将尽快进行审核
            </p>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-[#f8f9fa] dark:from-[#121212] to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 py-8 -mt-8 relative z-20">
        <Card className="bg-white dark:bg-gray-800 border-none shadow-lg rounded-xl overflow-hidden mb-8">
          <CardContent className="p-8">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="text-center">
                <h2 className="text-2xl font-semibold inline-flex items-center">
                  <Calendar className="mr-3 h-6 w-6 text-blue-600" />
                  审核流程
                </h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2 mb-8">
                  我们会认真审核每一个提交的工具，确保其质量和可用性
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-none p-6 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="h-16 w-16 bg-blue-100 dark:bg-blue-800/20 rounded-full flex items-center justify-center">
                      <ClipboardCheck className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-medium text-lg text-gray-800 dark:text-gray-100">初步审核</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      我们将在1-2个工作日内对您提交的工具信息进行初步审核，确认信息是否完整。
                    </p>
                  </div>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-none p-6 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="h-16 w-16 bg-purple-100 dark:bg-purple-800/20 rounded-full flex items-center justify-center">
                      <Rocket className="h-8 w-8 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h3 className="font-medium text-lg text-gray-800 dark:text-gray-100">功能验证</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      我们将访问并测试工具功能，确保其正常运行并符合描述，验证其价值和可用性。
                    </p>
                  </div>
                </Card>
                
                <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-none p-6 rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="h-16 w-16 bg-green-100 dark:bg-green-800/20 rounded-full flex items-center justify-center">
                      <LayoutGrid className="h-8 w-8 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="font-medium text-lg text-gray-800 dark:text-gray-100">发布上线</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      通过审核的工具将在平台上线，并通过邮件通知您。您的贡献将帮助更多用户发现优质工具。
                    </p>
                  </div>
                </Card>
              </div>
              
              <div className="p-5 border rounded-lg bg-blue-50/50 dark:bg-blue-900/10 flex items-start space-x-4">
                <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-base mb-1">有问题需要帮助？</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    如有任何问题或需要更新提交的信息，请随时联系我们的支持团队。我们通常会在24小时内回复您的咨询。
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-8 justify-center pt-6">
                <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white h-12 px-8 rounded-full">
                  <Link href="/">
                    <Home className="mr-2 h-5 w-5" />
                    返回首页
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-12 px-8 rounded-full border-gray-300 dark:border-gray-700">
                  <Link href="/submit-tool">
                    <Wrench className="mr-2 h-5 w-5" />
                    再次提交
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 