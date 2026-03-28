/**
 * 标准自动化评估系统
 * AI律师团队协作全球标准 v1.8
 * AI法务团队协作全球标准 v1.8
 */

const fs = require('fs-extra');
const path = require('path');

class StandardAssessmentSystem {
    constructor() {
        this.standardVersion = 'v1.8';
        this.lawyerStandardPath = path.join(__dirname, '../../AI律师团队协作全球标准-v1.8.md');
        this.legalStandardPath = path.join(__dirname, '../../AI法务团队协作全球标准-v1.8.md');
        this.assessmentTemplate = this.loadAssessmentTemplate();
    }

    /**
     * 加载评估模板
     */
    loadAssessmentTemplate() {
        return {
            // 基础信息
            basic: [
                {
                    id: 'q1',
                    question: '组织规模（律师人数）',
                    type: 'select',
                    options: ['<10人', '10-50人', '50-100人', '100-500人', '500人以上'],
                    weights: [1, 2, 3, 4, 5]
                },
                {
                    id: 'q2',
                    question: '主要业务领域',
                    type: 'multiselect',
                    options: [
                        '民事诉讼', '刑事诉讼', '商事诉讼',
                        '非诉业务', '企业法务', '知识产权',
                        '并购重组', '合规审查', '风险管理'
                    ],
                    weights: {
                        '民事诉讼': 1.5,
                        '刑事诉讼': 1.5,
                        '商事诉讼': 1.5,
                        '非诉业务': 1.0,
                        '企业法务': 1.5,
                        '知识产权': 1.2,
                        '并购重组': 1.3,
                        '合规审查': 1.2,
                        '风险管理': 1.2
                    }
                },
                {
                    id: 'q3',
                    question: '现有IT基础设施',
                    type: 'select',
                    options: ['无', '基础办公软件', '专业法律软件', '云端协作平台', 'AI工具已部署'],
                    weights: [0, 1, 2, 3, 5]
                },
                {
                    id: 'q4',
                    question: '数字化转型程度',
                    type: 'select',
                    options: ['未开始', '规划中', '实施中', '部分完成', '全面完成'],
                    weights: [0, 1, 2, 3, 5]
                },
                {
                    id: 'q5',
                    question: '团队AI技术熟悉度',
                    type: 'select',
                    options: ['完全不熟悉', '了解基本概念', '有使用经验', '熟练使用', '专家级别'],
                    weights: [0, 1, 2, 3, 4]
                }
            ],
            // 深度评估
            depth: [
                {
                    id: 'd1',
                    question: '现有法律知识库规模',
                    type: 'select',
                    options: ['<100条', '100-500条', '500-1000条', '1000-5000条', '5000条以上'],
                    weights: [1, 2, 3, 4, 5]
                },
                {
                    id: 'd2',
                    question: '工作流程标准化程度',
                    type: 'select',
                    options: ['无标准化', '部分标准化', '基本标准化', '高度标准化', '完全标准化'],
                    weights: [0, 1, 2, 3, 5]
                },
                {
                    id: 'd3',
                    question: '跨部门协作频率',
                    type: 'select',
                    options: ['从不', '偶尔', '每周', '每天', '实时'],
                    weights: [0, 1, 2, 3, 5]
                },
                {
                    id: 'd4',
                    question: '数据分析需求',
                    type: 'multiselect',
                    options: [
                        '案例分析统计', '案件趋势分析', '客户画像分析',
                        '成本收益分析', '风险预警', '绩效分析'
                    ],
                    weights: {
                        '案例分析统计': 1.2,
                        '案件趋势分析': 1.2,
                        '客户画像分析': 1.0,
                        '成本收益分析': 1.3,
                        '风险预警': 1.0,
                        '绩效分析': 1.0
                    }
                },
                {
                    id: 'd5',
                    question: '移动办公需求',
                    type: 'select',
                    options: ['不需要', '偶尔需要', '经常需要', '经常需要', '完全移动办公'],
                    weights: [0, 1, 2, 3, 5]
                }
            ],
            // 挑战与需求
            challenges: [
                {
                    id: 'c1',
                    question: '当前最大挑战',
                    type: 'select',
                    options: ['成本控制', '效率提升', '质量控制', '知识管理', '人才培养'],
                    weights: [2, 2, 2, 1, 1]
                },
                {
                    id: 'c2',
                    question: '期望通过AI解决的核心问题',
                    type: 'multiselect',
                    options: [
                        '降低成本', '提升效率', '提高准确率', '增强竞争力',
                        '标准化流程', '知识传承', '风险控制', '客户服务'
                    ],
                    weights: {
                        '降低成本': 2.0,
                        '提升效率': 2.0,
                        '提高准确率': 1.5,
                        '增强竞争力': 1.0,
                        '标准化流程': 1.2,
                        '知识传承': 1.0,
                        '风险控制': 1.2,
                        '客户服务': 1.0
                    }
                },
                {
                    id: 'c3',
                    question: '预算规模（年度）',
                    type: 'select',
                    options: ['<10万', '10-50万', '50-100万', '100-500万', '500万以上'],
                    weights: [1, 2, 3, 4, 5]
                },
                {
                    id: 'c4',
                    question: '期望实施时间周期',
                    type: 'select',
                    options: ['1-3个月', '3-6个月', '6-12个月', '1-2年', '2年以上'],
                    weights: [5, 4, 3, 2, 1]
                },
                {
                    id: 'c5',
                    question: '管理层支持程度',
                    type: 'select',
                    options: ['不支持', '部分支持', '支持', '大力支持', '全面支持'],
                    weights: [0, 1, 2, 4, 5]
                }
            ]
        };
    }

    /**
     * 计算基础评分
     */
    calculateBasicScore(answers) {
        let totalScore = 0;
        let maxScore = 0;
        let totalWeight = 0;

        this.assessmentTemplate.basic.forEach(q => {
            const answer = answers[q.id];
            if (q.type === 'select') {
                const weight = q.weights[answer];
                totalScore += weight;
                totalWeight += weight;
                maxScore += 5; // 最高权重
            } else if (q.type === 'multiselect') {
                if (Array.isArray(answer)) {
                    answer.forEach(a => {
                        totalScore += q.weights[a];
                        totalWeight += 5; // 最高权重
                    });
                    maxScore += 5 * answer.length;
                }
            }
        });

        return {
            score: totalWeight > 0 ? Math.round((totalScore / maxWeight) * 100) : 0,
            details: this.calculateBasicDetails(answers)
        };
    }

    /**
     * 计算基础评估详情
     */
    calculateBasicDetails(answers) {
        const details = {};
        this.assessmentTemplate.basic.forEach(q => {
            const answer = answers[q.id];
            let score = 0;
            if (q.type === 'select') {
                score = q.weights[answer];
            } else if (q.type === 'multiselect' && Array.isArray(answer)) {
                answer.forEach(a => {
                    score += q.weights[a];
                });
            }
            details[q.id] = {
                question: q.question,
                answer: answer,
                score: score,
                maxScore: q.type === 'multiselect' ? 5 * answer.length : 5
            };
        });
        return details;
    }

    /**
     * 计算深度评分
     */
    calculateDepthScore(answers) {
        let totalScore = 0;
        let maxScore = 0;

        this.assessmentTemplate.depth.forEach(q => {
            const answer = answers[q.id];
            if (q.type === 'select') {
                const weight = q.weights[answer];
                totalScore += weight;
                maxScore += 5;
            } else if (q.type === 'multiselect' && Array.isArray(answer)) {
                answer.forEach(a => {
                    totalScore += q.weights[a];
                    maxScore += 5;
                });
            }
        });

        return {
            score: maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0,
            details: this.calculateDepthDetails(answers)
        };
    }

    /**
     * 计算深度评估详情
     */
    calculateDepthDetails(answers) {
        const details = {};
        this.assessmentTemplate.depth.forEach(q => {
            const answer = answers[q.id];
            let score = 0;
            if (q.type === 'select') {
                score = q.weights[answer];
            } else if (q.type === 'multiselect' && Array.isArray(answer)) {
                answer.forEach(a => {
                    score += q.weights[a];
                });
            }
            details[q.id] = {
                question: q.question,
                answer: answer,
                score: score,
                maxScore: q.type === 'multiselect' ? 5 * answer.length : 5
            };
        });
        return details;
    }

    /**
     * 计算挑战评分
     */
    calculateChallengesScore(answers) {
        let totalScore = 0;
        let maxScore = 0;

        this.assessmentTemplate.challenges.forEach(q => {
            const answer = answers[q.id];
            if (q.type === 'select') {
                const weight = q.weights[answer];
                totalScore += weight;
                maxScore += 5;
            } else if (q.type === 'multiselect' && Array.isArray(answer)) {
                answer.forEach(a => {
                    totalScore += q.weights[a];
                    maxScore += 5;
                });
            }
        });

        return {
            score: maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0,
            details: this.calculateChallengesDetails(answers)
        };
    }

    /**
     * 计算挑战评估详情
     */
    calculateChallengesDetails(answers) {
        const details = {};
        this.assessmentTemplate.challenges.forEach(q => {
            const answer = answers[q.id];
            let score = 0;
            if (q.type === 'select') {
                score = q.weights[answer];
            } else if (q.type === 'multiselect' && Array.isArray(answer)) {
                answer.forEach(a => {
                    score += q.weights[a];
                });
            }
            details[q.id] = {
                question: q.question,
                answer: answer,
                score: score,
                maxScore: q.type === 'multiselect' ? 5 * answer.length : 5
            };
        });
        return details;
    }

    /**
     * 计算综合评分
     */
    calculateOverallScore(basicScore, depthScore, challengesScore) {
        const weights = {
            basic: 0.3,
            depth: 0.4,
            challenges: 0.3
        };

        const overallScore = Math.round(
            (basicScore * weights.basic) +
            (depthScore * weights.depth) +
            (challengesScore * weights.challenges)
        );

        return overallScore;
    }

    /**
     * 确定适配等级
     */
    getAdaptationLevel(score) {
        if (score >= 90) return { level: '高适配', color: '🟢', min: 90, max: 100 };
        if (score >= 75) return { level: '中高适配', color: '🟡', min: 75, max: 89 };
        if (score >= 60) return { level: '中适配', color: '🟡', min: 60, max: 74 };
        if (score >= 40) return { level: '中低适配', color: '🟠', min: 40, max: 59 };
        return { level: '低适配', color: '🔴', min: 0, max: 39 };
    }

    /**
     * 生成优化建议
     */
    generateOptimization(assessment) {
        const suggestions = [];

        // 基于分数的通用建议
        if (assessment.basic.score < 60) {
            suggestions.push({
                priority: 'P0',
                category: '基础设施',
                title: '加强IT基础设施建设',
                description: '您的IT基础设施评分较低，建议优先升级云端协作平台和AI工具',
                estimatedTime: '1-3个月',
                estimatedCost: '5-20万'
            });
        }

        if (assessment.depth.score < 60) {
            suggestions.push({
                priority: 'P0',
                category: '知识管理',
                title: '建设法律知识库',
                description: '建立专业的法律知识库，提升团队整体专业能力',
                estimatedTime: '2-4个月',
                estimatedCost: '10-30万'
            });
        }

        if (assessment.challenges.score < 50) {
            suggestions.push({
                priority: 'P1',
                category: '管理层支持',
                title: '加强管理层支持',
                description: '管理层支持是成功实施AI标准的关键，建议获得更高层面的支持',
                estimatedTime: '1-2个月',
                estimatedCost: '待定'
            });
        }

        // 基于具体问题的建议
        const details = { ...assessment.basic.details, ...assessment.depth.details, ...assessment.challenges.details };

        Object.keys(details).forEach(key => {
            const detail = details[key];
            if (detail.score < 2 && detail.maxScore >= 3) {
                suggestions.push({
                    priority: 'P1',
                    category: '具体问题',
                    title: `优化：${detail.question}`,
                    description: `当前选择得分较低，建议加强此方面的投入`,
                    estimatedTime: '1-3个月',
                    estimatedCost: '5-15万'
                });
            }
        });

        return suggestions;
    }

    /**
     * 生成完整评估报告
     */
    async generateReport(answers, userInfo = {}) {
        // 计算各项评分
        const basicResult = this.calculateBasicScore(answers);
        const depthResult = this.calculateDepthScore(answers);
        const challengesResult = this.calculateChallengesScore(answers);

        // 计算综合评分
        const overallScore = this.calculateOverallScore(
            basicResult.score,
            depthResult.score,
            challengesResult.score
        );

        // 确定适配等级
        const adaptationLevel = this.getAdaptationLevel(overallScore);

        // 生成优化建议
        const optimizations = this.generateOptimization({
            basic: basicResult,
            depth: depthResult,
            challenges: challengesResult
        });

        // 生成完整报告
        const report = {
            metadata: {
                generatedAt: new Date().toISOString(),
                standardVersion: this.standardVersion,
                assessor: 'AI律师标准评估系统 v1.0'
            },
            userInfo: {
                name: userInfo.name || '未提供',
                organization: userInfo.organization || '未提供',
                industry: userInfo.industry || '法律行业',
                size: userInfo.size || '未提供'
            },
            assessment: {
                basic: basicResult,
                depth: depthResult,
                challenges: challengesResult,
                overall: {
                    score: overallScore,
                    adaptationLevel: adaptationLevel
                }
            },
            recommendations: {
                optimizations: optimizations,
                nextSteps: this.generateNextSteps(overallScore, adaptationsLevel),
                implementationPlan: this.generateImplementationPlan(overallScore, adaptationsLevel)
            }
        };

        return report;
    }

    /**
     * 生成后续步骤
     */
    generateNextSteps(score, adaptationLevel) {
        const steps = [];

        if (score >= 90) {
            steps.push({
                phase: '快速启动',
                steps: [
                    '立即启动标准实施',
                    '两周内完成团队培训',
                    '一个月内看到明显效果'
                ]
            });
        } else if (score >= 75) {
            steps.push({
                phase: '稳步推进',
                steps: [
                    '制定详细实施计划',
                    '一个月内完成基础设施升级',
                    '两个月内完成团队培训',
                    '三个月内看到显著效果'
                ]
            });
        } else if (score >= 60) {
            steps.push({
                phase: '逐步实施',
                steps: [
                    '制定阶段性实施计划',
                    '1-2个月内完成基础设施',
                    '2-3个月内完成核心功能',
                    '3-6个月内完成全面实施'
                ]
            });
        } else {
            steps.push({
                phase: '前期准备',
                steps: [
                    '深入调研和规划',
                    '1-3个月内完成准备工作',
                    '3-6个月开始试点',
                    '6-12个月全面推广'
                ]
            });
        }

        return steps;
    }

    /**
     * 生成实施计划
     */
    generateImplementationPlan(score, adaptationLevel) {
        const plan = [];

        const estimatedMonths = score >= 90 ? 2 : score >= 75 ? 4 : score >= 60 ? 6 : 12;

        plan.push({
            phase: '第一阶段：准备与规划',
            duration: estimatedMonths * 0.2,
            activities: [
                '组建项目团队',
                '制定详细实施计划',
                '完成基础设施评估',
                '预算和时间规划'
            ]
        });

        plan.push({
            phase: '第二阶段：基础设施建设',
            duration: estimatedMonths * 0.3,
            activities: [
                '部署云端协作平台',
                '集成AI工具',
                '建立数据安全体系',
                '完成系统集成测试'
            ]
        });

        plan.push({
            phase: '第三阶段：团队培训与试点',
            duration: estimatedMonths * 0.2,
            activities: [
                '全面团队培训',
                '选择试点项目',
                '试点运行与优化',
                '总结试点经验'
            ]
        });

        plan.push({
            phase: '第四阶段：全面推广',
            duration: estimatedMonths * 0.3,
            activities: [
                '全面推广实施',
                '持续优化改进',
                '效果评估与反馈',
                '长期运维支持'
            ]
        });

        return plan;
    }

    /**
     * 导出报告为JSON
     */
    exportToJSON(report) {
        return JSON.stringify(report, null, 2);
    }

    /**
     * 导出报告为Markdown
     */
    exportToMarkdown(report) {
        let md = `# AI律师标准评估报告\n\n`;
        md += `**生成时间：** ${report.metadata.generatedAt}\n`;
        md += `**标准版本：** ${report.metadata.standardVersion}\n\n`;

        md += `## 📊 评估概览\n\n`;
        md += `**综合评分：** ${report.assessment.overall.score}分/100分\n`;
        md += `**适配等级：** ${report.assessment.overall.adaptationLevel.level} ${report.assessment.overall.adaptationLevel.color}\n\n`;

        md += `### 详细评分\n\n`;
        md += `- **基础评分：** ${report.assessment.basic.score}分\n`;
        md += `- **深度评分：** ${report.assessment.depth.score}分\n`;
        md += `- **挑战评分：** ${report.assessment.challenges.score}分\n\n`;

        md += `## 💡 优化建议\n\n`;
        if (report.recommendations.optimizations.length > 0) {
            report.recommendations.optimizations.forEach((opt, idx) => {
                md += `${idx + 1}. [${opt.priority}] ${opt.category} - ${opt.title}\n`;
                md += `   - 描述：${opt.description}\n`;
                md += `   - 预计时间：${opt.estimatedTime}\n`;
                md += `   - 预计成本：${opt.estimatedCost}\n\n`;
            });
        } else {
            md += `暂无特别建议\n\n`;
        }

        md += `## 🚀 后续步骤\n\n`;
        report.recommendations.nextSteps.forEach((step, idx) => {
            md += `### ${step.phase}\n\n`;
            step.steps.forEach((s, i) => {
                md += `${i + 1}. ${s}\n`;
            });
            md += '\n';
        });

        md += `## 📅 实施计划\n\n`;
        report.recommendations.implementationPlan.forEach((phase, idx) => {
            md += `### ${phase.phase} (${phase.duration}个月)\n\n`;
            phase.activities.forEach((act, i) => {
                md += `${i + 1}. ${act}\n`;
            });
            md += '\n';
        });

        return md;
    }
}

// 导出类
module.exports = StandardAssessmentSystem;

// 如果直接运行此文件，执行测试
if (require.main === module) {
    const system = new StandardAssessmentSystem();

    // 测试数据
    const testAnswers = {
        q1: '<10人',
        q2: ['民事诉讼', '企业法务', '风险管理'],
        q3: '基础办公软件',
        q4: '未开始',
        q5: '了解基本概念',
        d1: '<100条',
        d2: '无标准化',
        d3: '从不',
        d4: ['案例分析统计', '风险预警'],
        d5: '偶尔需要',
        c1: '成本控制',
        c2: ['降低成本', '提升效率', '风险控制'],
        c3: '10-50万',
        c4: '3-6个月',
        c5: '支持'
    };

    const testUserInfo = {
        name: '测试律所',
        organization: 'XX律师事务所',
        industry: '法律服务',
        size: '小型律所'
    };

    // 生成报告
    system.generateReport(testAnswers, testUserInfo).then(report => {
        console.log('\n=== JSON格式 ===');
        console.log(system.exportToJSON(report));

        console.log('\n=== Markdown格式 ===');
        console.log(system.exportToMarkdown(report));
    }).catch(err => {
        console.error('生成报告失败:', err);
    });
}
