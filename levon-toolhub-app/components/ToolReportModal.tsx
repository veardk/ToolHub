"use client"

import React, { useState } from "react"
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"

// 问题类别常量
const REPORT_CATEGORIES = [
  { value: 0, label: "信息错误" },
  { value: 1, label: "链接失效" },
  { value: 2, label: "内容过时" },
  { value: 3, label: "其他问题" }
]

interface ToolReportModalProps {
  toolId: string | number | string[]
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export default function ToolReportModal({ 
  toolId,
  isOpen, 
  onOpenChange 
}: ToolReportModalProps) {
  const router = useRouter()
  const [category, setCategory] = useState<number>(0)
  const [description, setDescription] = useState<string>("")
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0)
  const [submitCount, setSubmitCount] = useState<number>(0)

  // 提交次数限制和冷却时间（分钟）
  const MAX_SUBMISSIONS = 2 // 允许连续提交2次
  const COOLDOWN_TIME = 3 // 冷却时间改为3分钟
  
  // 检查提交冷却和次数
  React.useEffect(() => {
    // 检查是否有提交限制
    const checkCooldown = () => {
      // 获取提交历史记录
      const submissionHistory = localStorage.getItem(`tool_report_history_${toolId}`)
      
      if (submissionHistory) {
        const history = JSON.parse(submissionHistory)
        const submissions = history.timestamps || []
        const count = history.count || 0
        
        // 设置当前提交次数状态
        setSubmitCount(count)
        
        // 只有当提交次数达到限制时才检查冷却时间
        if (count > MAX_SUBMISSIONS && submissions.length > 0) {
          const lastTime = submissions[submissions.length - 1]
          const now = Date.now()
          const timePassed = Math.floor((now - lastTime) / 1000) // 已过去的秒数
          const cooldownTimeInSeconds = COOLDOWN_TIME * 60
          
          if (timePassed < cooldownTimeInSeconds) {
            const remaining = cooldownTimeInSeconds - timePassed
            setCooldownRemaining(remaining)
            
            // 设置倒计时
            const timer = setInterval(() => {
              setCooldownRemaining(prev => {
                if (prev <= 1) {
                  clearInterval(timer)
                  return 0
                }
                return prev - 1
              })
            }, 1000)
            
            return () => clearInterval(timer)
          } else {
            // 冷却时间已过，重置提交次数
            const newHistory = {
              count: 0,
              timestamps: []
            }
            localStorage.setItem(`tool_report_history_${toolId}`, JSON.stringify(newHistory))
            setSubmitCount(0)
          }
        }
      } else {
        // 初始化提交历史
        const newHistory = {
          count: 0,
          timestamps: []
        }
        localStorage.setItem(`tool_report_history_${toolId}`, JSON.stringify(newHistory))
      }
      
      setCooldownRemaining(0)
    }
    
    if (isOpen) {
      checkCooldown()
    }
  }, [isOpen, toolId])

  // 重置表单
  const resetForm = () => {
    setCategory(0)
    setDescription("")
    setError(null)
    setIsSubmitting(false)
  }

  // 表单验证
  const validateForm = (): boolean => {
    setError(null)

    // 检查冷却时间
    if (cooldownRemaining > 0) {
      const minutes = Math.floor(cooldownRemaining / 60)
      const seconds = cooldownRemaining % 60
      setError(`您已连续提交${submitCount}次，请等待 ${minutes}分${seconds}秒后再试`)
      return false
    }

    if (description.trim().length < 10 || description.trim().length > 500) {
      setError("问题描述长度应在10-500个字符之间")
      return false
    }

    return true
  }

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    const submitStartTime = Date.now()

    // 确保toolId是字符串
    const id = Array.isArray(toolId) ? toolId[0] : toolId

    try {
      const response = await fetch(`/api/tool/${id}/report`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          category,
          description: description.trim()
        })
      })

      // 检查响应状态
      if (!response.ok) {
        console.error('API请求失败:', response.status, response.statusText);
        throw new Error(`请求失败: ${response.status}`);
      }

      const data = await response.json()
      console.log('报告提交响应:', data);
      
      // 计算已经过去的时间，确保加载状态至少显示1秒
      const elapsedTime = Date.now() - submitStartTime
      const remainingTime = Math.max(0, 1000 - elapsedTime)
      
      // 等待剩余时间以确保总共显示至少1秒的加载状态
      await new Promise(resolve => setTimeout(resolve, remainingTime))

      if (data.code === 200 || data.success) {
        // 更新提交历史记录
        const submissionHistory = localStorage.getItem(`tool_report_history_${id}`)
        let history = submissionHistory ? JSON.parse(submissionHistory) : { count: 0, timestamps: [] }
        
        // 更新次数和时间戳
        history.count = (history.count || 0) + 1
        history.timestamps.push(Date.now())
        
        // 只保留最近的提交记录
        if (history.timestamps.length > 10) {
          history.timestamps = history.timestamps.slice(-10)
        }
        
        // 保存更新后的历史
        localStorage.setItem(`tool_report_history_${id}`, JSON.stringify(history))
        setSubmitCount(history.count)
        
        // 成功提交 - 移除toast提示，只保留中央提示
        // 先关闭对话框
        onOpenChange(false)
        resetForm()
        
        // 创建更现代化的成功提示
        const successContainer = document.createElement('div')
        // 半透明背景遮罩
        successContainer.className = 'fixed inset-0 flex items-center justify-center z-50 bg-black/20 dark:bg-black/40 backdrop-blur-sm transition-opacity duration-300'
        
        // 创建内容容器
        const successContent = document.createElement('div')
        successContent.className = 'transform transition-all duration-300 scale-95 opacity-0 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-11/12 overflow-hidden'
        
        // 顶部绿色条
        const topBar = document.createElement('div')
        topBar.className = 'h-2 bg-gradient-to-r from-green-400 to-emerald-500'
        
        // 内容区域
        const contentArea = document.createElement('div')
        contentArea.className = 'p-8'
        
        // 图标区域
        const iconContainer = document.createElement('div')
        iconContainer.className = 'mb-6 flex justify-center'
        
        // 动画成功图标
        const successIcon = document.createElement('div')
        successIcon.className = 'w-20 h-20 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center'
        successIcon.innerHTML = `
          <svg class="w-12 h-12 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
          </svg>
        `
        
        // 文本内容
        const textContent = document.createElement('div')
        textContent.className = 'text-center'
        textContent.innerHTML = `
          <h2 class="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">提交成功</h2>
          <p class="text-gray-600 dark:text-gray-300">感谢您的反馈，我们会尽快处理您的问题报告</p>
        `
        
        // 添加关闭按钮
        const closeButton = document.createElement('button')
        closeButton.className = 'mt-6 w-full py-3 px-6 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-medium rounded-lg transition-colors duration-300 flex items-center justify-center'
        closeButton.innerHTML = `
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
          知道了
        `
        
        // 组装DOM元素
        iconContainer.appendChild(successIcon)
        contentArea.appendChild(iconContainer)
        contentArea.appendChild(textContent)
        contentArea.appendChild(closeButton)
        successContent.appendChild(topBar)
        successContent.appendChild(contentArea)
        successContainer.appendChild(successContent)
        document.body.appendChild(successContainer)
        
        // 添加事件处理
        closeButton.onclick = () => {
          successContainer.style.opacity = '0'
          setTimeout(() => {
            document.body.removeChild(successContainer)
          }, 300)
        }
        
        // 点击背景关闭
        successContainer.onclick = (e) => {
          if (e.target === successContainer) {
            successContainer.style.opacity = '0'
            setTimeout(() => {
              document.body.removeChild(successContainer)
            }, 300)
          }
        }
        
        // 显示动画
        setTimeout(() => {
          successContent.style.opacity = '1'
          successContent.style.transform = 'scale(1)'
        }, 10)
        
        // 自动关闭
        setTimeout(() => {
          successContainer.style.opacity = '0'
          setTimeout(() => {
            if (document.body.contains(successContainer)) {
              document.body.removeChild(successContainer)
            }
          }, 300)
        }, 5000)
      } else {
        // 请求失败
        setError(data.message || "提交失败，请稍后重试")
        toast({
          title: "提交失败",
          description: data.message || "请稍后重试",
          variant: "destructive"
        })
      }
    } catch (error) {
      console.error("提交工具问题报告出错:", error)
      setError("网络错误，请稍后重试")
      toast({
        title: "提交失败", 
        description: error instanceof Error ? error.message : "网络错误，请稍后重试",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // 对话框关闭时重置表单
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetForm()
    }
    onOpenChange(open)
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>报告问题</DialogTitle>
            <DialogDescription>
              如果您发现该工具信息有误或链接失效，请告知我们。
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label htmlFor="issue-category" className="text-right text-sm font-medium">
                问题类型
              </label>
              <select
                id="issue-category"
                className="col-span-3 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                value={category}
                onChange={(e) => setCategory(Number(e.target.value))}
                disabled={isSubmitting}
              >
                {REPORT_CATEGORIES.map((cat) => (
                  <option key={cat.value} value={cat.value}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-4 items-start gap-4">
              <label htmlFor="issue-description" className="text-right text-sm font-medium">
                详细描述
              </label>
              <div className="col-span-3 space-y-1">
                <textarea
                  id="issue-description"
                  className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  placeholder="请详细描述您发现的问题..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isSubmitting}
                  rows={5}
                />
                {error && (
                  <p className="text-xs text-destructive">{error}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  请提供至少10个字符的描述，不超过500个字符
                </p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="submit" 
              disabled={isSubmitting || cooldownRemaining > 0}
              className="relative"
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  提交中
                  <span className="animate-pulse">.</span>
                  <span className="animate-pulse delay-150">.</span>
                  <span className="animate-pulse delay-300">.</span>
                </span>
              ) : cooldownRemaining > 0 ? (
                `请等待 ${Math.floor(cooldownRemaining / 60)}:${(cooldownRemaining % 60).toString().padStart(2, '0')}`
              ) : (
                submitCount > 0 ? `提交报告 (${submitCount}/${MAX_SUBMISSIONS})` : "提交报告"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
} 