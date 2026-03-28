/**
 * 标准ROI计算器
 * AI律师团队协作全球标准 v1.8
 * AI法务团队协作全球标准 v1.8
 */

const fs = require('fs-extra');
const path = require('path');

class ROICalculator {
    constructor() {
        this.standardVersion = 'v1.8';
        this.benchmarkData = this.loadBenchmarkData();
    }

    /**
     * 加载基准数据
     */
    loadBenchmarkData() {
        return {
            // 小型律所基准数据
            small: {
                before: {
                    averageHourlyCost: 300,
                    monthlyRevenue: 50,
                    avgCasesPerLawyer: 5,
                    avgHoursPerCase: 10,
                    teamSize: 5,
                    monthlyCost: 300 * 8 * 22 * 5 * 1.2, // 约31.68万
                    monthlyRevenue: 50 * 10000 * 0.2, // 约10万
                    profitability: 10 // 10万收入 - 31.68万成本 = -21.68万利润率
                },
                after: {
                    averageHourlyCost: 20,
                    monthlyRevenue: 80,
                    avgCasesPerLawyer: 8,
                    avgHoursPerCase: 3,
                    teamSize: 5,
                    monthlyCost: 20 * 8 * 22 * 5 * 1.0, // 约1.76万
                    monthlyRevenue: 80 * 10000 * 0.3, // 约24万
                    profitability: 92 // 24万收入 - 1.76万成本 = 22.24万利润率
                },
                savings: {
                    costSaving: 31.68 - 1.76 = 29.92万/月,
                    revenueIncrease: 24 - 10 = 14万/月
                }
            },
            // 中型律所基准数据
            medium: {
                before: {
                    averageHourlyCost: 350,
                    monthlyRevenue: 200,
                    avgCasesPerLawyer: 6,
                    avgHoursPerCase: 12,
                    teamSize: 20,
                    monthlyCost: 350 * 8 * 22 * 20 * 1.2, // 约147.84万
                    monthlyRevenue: 200 * 10000 * 0.2, // 约40万
                    profitability: 6 // 40万收入 - 147.84万成本 = -107.84万利润率
                },
                after: {
                    averageHourlyCost: 25,
                    monthlyRevenue: 300,
                    avgCasesPerLawyer: 10,
                    avgHoursPerCase: 3,
                    teamSize: 20,
                    monthlyCost: 25 * 8 * 22 * 20 * 1.0, // 约8.8万
                    monthlyRevenue: 300 * 10000 * 0.3, // 约90万
                    profitability: 90 // 90万收入 - 8.8万成本 = 81.2万利润率
                },
                savings: {
                    costSaving: 147.84 - 8.8 = 139.04万/月,
                    revenueIncrease: 90 - 40 = 50万/月
                }
            },
            // 大型律所基准数据
            large: {
                before: {
                    averageHourlyCost: 400,
                    monthlyRevenue: 500,
                    avgCasesPerLawyer: 7,
                    avgHoursPerCase: 14,
                    teamSize: 100,
                    monthlyCost: 400 * 8 * 22 * 100 * 1.2, // 约844.8万
                    monthlyRevenue: 500 * 10000 * 0.2, // 约100万
                    profitability: -2 // 100万收入 - 844.8万成本 = -744.8万利润率
                },
                after: {
                    averageHourlyCost: 30,
                    monthlyRevenue: 800,
                    avgCasesPerLawyer: 12,
                    avgHoursPerCase: 4,
                    teamSize: 100,
                    monthlyCost: 30 * 8 * 22 * 100 * 1.0, // 约52.8万
                    monthlyRevenue: 800 * 10000 * 0.3, // 约240万
                    profitability: 78 // 240万收入 - 52.8万成本 = 187.2万利润率
                },
                savings: {
                    costSaving: 844.8 - 52.8 = 792万/月,
                    revenueIncrease: 240 - 100 = 140万/月
                }
            }
        };
    }

    /**
     * 计算投资回报率
     */
    calculateROI(userData, implementationCost, timeFrame = 12) {
        const result = {
            metadata: {
                calculatedAt: new Date().toISOString(),
                standardVersion: this.standardVersion,
                calculator: 'AI标准ROI计算器 v1.0'
            },
            input: {
                userData,
                implementationCost,
                timeFrame
            },
            beforeState: {},
            afterState: {},
            savings: {},
            roi: {},
            payback: {}
        };

        // 确定律所类型
        let orgType = 'medium';
        if (userData.teamSize <= 10) {
            orgType = 'small';
        } else if (userData.teamSize >= 50) {
            orgType = 'large';
        }

        // 填充缺失数据（使用基准值）
        const filledData = {
            teamSize: userData.teamSize || 20,
            avgHourlyCost: userData.avgHourlyCost || this.benchmarkData[orgType].before.averageHourlyCost,
            monthlyRevenue: userData.monthlyRevenue || this.benchmarkData[orgType].before.monthlyRevenue,
            avgCasesPerLawyer: userData.avgCasesPerLawyer || this.benchmarkData[orgType].before.avgCasesPerLawyer,
            avgHoursPerCase: userData.avgHoursPerLawyer || this.benchmarkData[orgType].before.avgHoursPerCase
        };

        // 计算实施前状态
        result.beforeState = {
            averageHourlyCost: filledData.avgHourlyCost,
            monthlyRevenue: filledData.monthlyRevenue,
            avgCasesPerLawyer: filledData.avgCasesPerLawyer,
            avgHoursPerCase: filledData.avgHoursPerCase,
            teamSize: filledData.teamSize,
            totalMonthlyHours: filledData.avgHoursPerCase * filledData.avgCasesPerLawyer * filledData.teamSize,
            monthlyCost: this.calculateMonthlyCost(filledData.avgHourlyCost, filledData.teamSize),
            monthlyRevenue: this.calculateMonthlyRevenue(filledData.monthlyRevenue, filledData.teamSize),
            monthlyProfit: 0
        };

        result.beforeState.monthlyCost = this.calculateMonthlyCost(
            result.beforeState.averageHourlyCost,
            result.beforeState.teamSize,
            1.2 // 20%管理成本
        );

        result.beforeState.monthlyRevenue = this.calculateMonthlyRevenue(
            result.beforeState.monthlyRevenue,
            result.beforeState.teamSize,
            0.2 // 20%利润率
        );

        result.beforeState.monthlyProfit = result.beforeState.monthlyRevenue - result.beforeState.monthlyCost;
        result.beforeState.profitability = result.beforeState.monthlyCost > 0 
            ? (result.beforeState.monthlyProfit / result.beforeState.monthlyRevenue * 100) 
            : ((result.beforeState.monthlyProfit / Math.abs(result.beforeState.monthlyCost)) * -100);

        // 计算实施后状态（使用基准数据）
        const benchmark = this.benchmarkData[orgType].after;
        result.afterState = {
            averageHourlyCost: benchmark.averageHourlyCost,
            monthlyRevenue: benchmark.monthlyRevenue,
            avgCasesPerLawyer: benchmark.avgCasesPerLawyer,
            avgHoursPerCase: benchmark.avgHoursPerCase,
            teamSize: filledData.teamSize,
            totalMonthlyHours: benchmark.avgHoursPerCase * benchmark.avgCasesPerLawyer * filledData.teamSize,
            monthlyCost: this.calculateMonthlyCost(benchmark.averageHourlyCost, filledData.teamSize, 1.0),
            monthlyRevenue: this.calculateMonthlyRevenue(benchmark.monthlyRevenue, filledData.teamSize, 0.3),
            monthlyProfit: 0
        };

        result.afterState.monthlyProfit = result.afterState.monthlyRevenue - result.afterState.monthlyCost;
        result.afterState.profitability = (result.afterState.monthlyProfit / result.afterState.monthlyRevenue) * 100;

        // 计算节省和收益增加
        result.savings = {
            monthlyCostSaving: result.beforeState.monthlyCost - result.afterState.monthlyCost,
            monthlyRevenueIncrease: result.afterState.monthlyRevenue - result.beforeState.monthlyRevenue,
            monthlyProfitIncrease: result.afterState.monthlyProfit - result.beforeState.monthlyProfit
        };

        result.savings.annualCostSaving = result.savings.monthlyCostSaving * 12;
        result.savings.annualRevenueIncrease = result.savings.monthlyRevenueIncrease * 12;
        result.savings.annualProfitIncrease = result.savings.monthlyProfitIncrease * 12;

        // 计算投资回报
        result.roi = {
            annualSavings: result.savings.annualCostSaving + result.savings.annualRevenueIncrease,
            totalInvestment: implementationCost,
            annualROI: 0,
            paybackPeriod: 0,
            breakEvenPoint: null,
            profitRate: 0
        };

        result.roi.annualROI = ((result.roi.annualSavings - result.roi.totalInvestment) / result.roi.totalInvestment) * 100;

        result.roi.paybackPeriod = result.roi.totalInvestment / result.savings.monthlyProfitIncrease;
        result.roi.paybackMonths = Math.ceil(result.roi.paybackPeriod);

        if (result.roi.paybackMonths > 0 && result.roi.paybackMonths <= 12) {
            result.roi.breakEvenPoint = `实施后${result.roi.paybackMonths}个月`;
        } else if (result.roi.paybackMonths > 12) {
            result.roi.breakEvenPoint = `实施后${result.roi.paybackMonths}个月`;
        } else {
            result.roi.breakEvenPoint = '无法回本';
        }

        result.roi.profitRate = (result.roi.annualSavings / result.roi.totalInvestment) * 100;

        return result;
    }

    /**
     * 计算月度成本
     */
    calculateMonthlyCost(avgHourlyCost, teamSize, multiplier = 1.0) {
        const hoursPerMonth = 8 * 22; // 每天8小时，每月22个工作日
        const totalHours = hoursPerMonth * teamSize;
        const baseCost = avgHourlyCost * totalHours;
        return baseCost * multiplier;
    }

    /**
     * 计算月度收入
     */
    calculateMonthlyRevenue(baseRevenue, teamSize, profitRate = 0.2) {
        return baseRevenue * teamSize * profitRate;
    }

    /**
     * 生成ROI报告
     */
    generateReport(roiResult) {
        const report = {
            metadata: {
                generatedAt: new Date().toISOString(),
                standardVersion: this.standardVersion,
                calculator: 'AI标准ROI计算器 v1.0'
            },
            overview: {
                roi: roiResult.roi.annualROI,
                paybackPeriod: roiResult.roi.paybackMonths,
                breakEvenPoint: roiResult.roi.breakEvenPoint,
                profitRate: roiResult.roi.profitRate
            },
            investment: {
                total: roiResult.roi.totalInvestment,
                type: '一次性投资',
                description: 'AI标准实施成本'
            },
            savings: {
                annual: roiResult.roi.annualSavings,
                breakdown: {
                    costSaving: roiResult.savings.annualCostSaving,
                    revenueIncrease: roiResult.savings.annualRevenueIncrease,
                    profitIncrease: roiResult.savings.annualProfitIncrease
                }
            },
            details: {
                before: roiResult.beforeState,
                after: roiResult.afterState,
                comparison: {
                    costReduction: ((roiResult.beforeState.monthlyCost - roiResult.afterState.monthlyCost) / roiResult.beforeState.monthlyCost * 100).toFixed(1) + '%',
                    revenueGrowth: ((roiResult.afterState.monthlyRevenue - roiResult.beforeState.monthlyRevenue) / roiResult.beforeState.monthlyRevenue * 100).toFixed(1) + '%',
                    profitMarginImprovement: ((roiResult.afterState.profitability - roiResult.beforeState.profitability) / Math.abs(roiResult.beforeState.profitability)) * 100).toFixed(1) + '%'
                }
            },
            forecast: this.generateForecast(roiResult)
        };

        return report;
    }

    /**
     * 生成预测数据
     */
    generateForecast(roiResult) {
        const months = 12;
        const forecast = {
            cumulativeInvestment: [],
            cumulativeSavings: [],
            cumulativeProfit: []
        };

        let cumulativeInv = 0;
        let cumulativeSav = 0;
        let cumulativeProf = 0;

        for (let m = 1; m <= months; m++) {
            cumulativeInv = roiResult.roi.totalInvestment; // 一次性投资
            cumulativeSav = roiResult.savings.monthlyProfitIncrease * m;
            cumulativeProf = cumulativeSav - cumulativeInv;

            forecast.cumulativeInvestment.push(cumulativeInv);
            forecast.cumulativeSavings.push(cumulativeSav);
            forecast.cumulativeProfit.push(cumulativeProf);
        }

        return forecast;
    }

    /**
     * 生成图表数据
     */
    generateChartData(roiResult) {
        const chartData = {
            monthlyComparison: [],
            annualComparison: [],
            profitTrend: []
        };

        // 月度对比
        for (let m = 1; m <= 12; m++) {
            const monthProfit = roiResult.afterState.monthlyProfit * m - roiResult.roi.totalInvestment;
            chartData.monthlyComparison.push({
                month: m,
                beforeProfit: roiResult.beforeState.monthlyProfit * m,
                afterProfit: monthProfit
            });
        }

        // 年度对比
        chartData.annualComparison.push({
            year: '实施前',
            annualCost: roiResult.beforeState.monthlyCost * 12,
            annualRevenue: roiResult.beforeState.monthlyRevenue * 12,
            annualProfit: roiResult.beforeState.monthlyProfit * 12
        });

        chartData.annualComparison.push({
            year: '实施后',
            annualCost: roiResult.afterState.monthlyCost * 12,
            annualRevenue: roiResult.afterState.monthlyRevenue * 12,
            annualProfit: roiResult.afterState.monthlyProfit * 12
        });

        // 利润趋势
        const forecast = this.generateForecast(roiResult);
        chartData.profitTrend = forecast.cumulativeProfit.map((profit, idx) => ({
            month: idx + 1,
            profit
        }));

        return chartData;
    }

    /**
     * 导出为JSON
     */
    exportToJSON(report) {
        return JSON.stringify(report, null, 2);
    }

    /**
     * 导出为Markdown
     */
    exportToMarkdown(report) {
        let md = `# AI标准ROI分析报告\n\n`;
        md += `**计算时间：** ${report.metadata.generatedAt}\n`;
        md += `**标准版本：** ${report.metadata.standardVersion}\n\n`;

        md += `## 📊 投资回报概况\n\n`;
        md += `**投资回报率（ROI）：** ${report.overview.roi.toFixed(1)}%\n`;
        md += `**回本期：** ${report.overview.paybackPeriod}个月\n`;
        md += `**盈亏平衡点：** ${report.overview.breakEvenPoint}\n`;
        mda += `**利润率：** ${report.overview.profitRate.toFixed(1)}%\n\n`;

        md += `## 💰 投资分析\n\n`;
        md += `**总投资：** ¥${report.investment.total.toLocaleString()}\n`;
        mda += `**投资类型：** ${report.investment.type}\n`;
        md += `**投资说明：** ${report.investment.description}\n\n`;

        md += `## 💰 年度节省收益\n\n`;
        md += `**年度总节省：** ¥${report.savings.annual.toLocaleString()}\n\n`;
        md += `### 节省明细\n\n`;
        md += `- **成本节省：** ¥${report.savings.breakdown.costSaving.toLocaleString()} (${report.details.comparison.costReduction})\n`;
        md += `- **收入增加：** ¥${report.savings.breakdown.revenueIncrease.toLocaleString()} (${report.details.comparison.revenueGrowth})\n`;
        md += `- **利润增加：** ¥${report.savings.breakdown.profitIncrease.toLocaleString()} (${report.details.comparison.profitMarginImprovement})\n\n`;

        md += `## 📈 实施前后对比\n\n`;
        md += `### 实施前\n\n`;
        md += `- **团队规模：** ${report.details.before.teamSize}人\n`;
        md += `- **平均时薪：** ¥${report.details.before.averageHourlyCost}/小时\n`;
        `- **月度总工时：** ${report.details.before.totalMonthlyHours.toLocaleString()}小时\n`;
        md += `- **月度成本：** ¥${report.details.before.monthlyCost.toLocaleString()}\n`;
        md += `- **月度收入：** ¥${report.details.before.monthlyRevenue.toLocaleString()}\n`;
        md += `- **月度利润：** ¥${report.details.before.monthlyProfit.toLocaleString()}\n`;
        md += `- **利润率：** ${report.details.before.profitability.toFixed(1)}%\n\n`;

        md += `### 实施后\n\n`;
        md += `- **团队规模：** ${report.details.after.teamSize}人\n`;
        md += `- **平均时薪：** ¥${report.details.after.averageHourlyCost}/小时\n`;
        `- **月度总工时：** ${report.details.after.totalMonthlyHours.toLocaleString()}小时\n`;
        md += `- **月度成本：** ¥${report.details.after.monthlyCost.toLocaleString()}\n`;
        md += `- **月度收入：** ¥${report.details.after.monthlyRevenue.toLocaleString()}\n`;
        md += `- **月度利润：** ¥${report.details.after.monthlyProfit.toLocaleString()}\n`;
        md += `- **利润率：** ${report.details.after.profitability.toFixed(1)}%\n\n`;

        md += `## 📊 详细对比\n\n`;
        md += `| 指标 | 实施前 | 实施后 | 变化 |\n`;
        md += `|------|--------|--------|------|\n`;
        md += `| 平均时薪 | ¥${report.details.before.averageHourlyCost}/小时 | ¥${report.details.after.averageHourlyCost}/小时 | ${(1 - report.details.after.averageHourlyCost / report.details.before.averageHourlyCost * 100).toFixed(1)}% ↓ |\n`;
        md += `| 月度成本 | ¥${report.details.before.monthlyCost.toLocaleString()} | ¥${report.details.after.monthlyCost.toLocaleString()} | ${report.details.comparison.costReduction} ↓ |\n`;
        md += `| 月度收入 | ¥${report.details.before.monthlyRevenue.toLocaleString()} | ¥${report.details.after.monthlyRevenue.toLocaleString()} | ${report.details.comparison.revenueGrowth} ↑ |\n`;
        md += `| 月度利润 | ¥${report.details.before.monthlyProfit.toLocaleString()} | ¥${report.details.after.monthlyProfit.toLocaleString()} | - |\n`;
        md += `| 利润率 | ${report.details.before.profitability.toFixed(1)}% | ${report.details.after.profitability.toFixed(1)}% | ${report.details.comparison.profitMarginImprovement} ↑ |\n\n`;

        md += `## 🔮 预测分析（12个月）\n\n`;
        const forecast = report.forecast;
        md += `| 月份 | 累计投资 | 累计节省 | 累计利润 |\n`;
        md += `|------|----------|----------|----------|\n`;
        forecast.cumulativeInvestment.forEach((inv, idx) => {
            const profit = forecast.cumulativeProfit[idx];
            const profitStr = profit.toLocaleString();
            md += `| ${idx + 1}月 | ¥${inv.toLocaleString()} | ¥${forecast.cumulativeSavings[idx].toLocaleString()} | ${profit >= 0 ? '¥' + profitStr : '-¥' + Math.abs(profit).toLocaleString()} |\n`;
        });

        md += `\n## 💡 关键洞察\n\n`;

        // 根据ROI生成洞察
        if (report.overview.roi >= 200) {
            md += `### ✅ 极佳投资\n\n`;
            md += `- ROI高达${report.overview.roi.toFixed(1)}%，投资回报率极高\n`;
            md += `- ${report.overview.paybackPeriod}个月回本，投资回收期短\n`;
            md += `- 利润率${report.overview.profitRate.toFixed(1)}%，盈利能力极强\n`;
        } else if (report.overview.roi >= 100) {
            md += `### ✅ 优秀投资\n\n`;
            md += `- ROI超过100%，投资回报优秀\n`;
            md += `- ${report.overview.paybackPeriod}个月回本\n`;
            md += `- 利润率${report.overview.profitRate.toFixed(1)}%，盈利能力强\n`;
        } else if (report.overview.roi >= 50) {
            md += `### ✅ 良好投资\n\n`;
            md += `- ROI超过50%，投资回报良好\n`;
            md += `- ${report.overview.paybackPeriod}个月回本\n`;
            md += `- 利润率${report.overview.profitRate.toFixed(1)}%，盈利能力良好\n`;
        } else if (report.overview.roi >= 20) {
            md += `### 🟡 一般投资\n\n`;
            md += `- ROI为${report.overview.roi.toFixed(1)}%，投资回报尚可\n`;
            md += `- ${report.overview.paybackPeriod}个月回本，投资回收期较长\n`;
            md += `- 建议重新评估实施方案\n`;
        } else {
            md += `### 🔴 风险投资\n\n`;
            md += `- ROI仅为${report.overview.roi.toFixed(1)}%，投资回报较低\n`;
            md += `- ${report.overview.paybackPeriod}个月回本，投资回收期很长\n`;
            md += `- 建议重新评估或优化方案\n`;
        }

        md += `\n## 📌 建议\n\n`;
        if (report.overview.paybackPeriod > 12) {
            md += `1. **优化实施计划**：缩短回本周期\n`;
            md += `2. **分期实施**：降低单次投资压力\n`;
            md += `3. **增加培训投入**：提高采用效果\n`;
        } else {
            md += `1. **立即启动**：ROI良好，建议立即实施\n`;
            md += `2. **全员推广**：快速实现投资回报\n`;
            md += `3. **持续优化**：保持竞争力\n`;
        }

        return md;
    }
}

// 导出类
module.exports = ROICalculator;

// 如果直接运行此文件，执行测试
if (require.main === module) {
    const calculator = new ROICalculator();

    // 测试数据1：中型律所
    const testData1 = {
        teamSize: 20,
        avgHourlyCost: 350,
        monthlyRevenue: 200
    };

    const cost1 = 500000;

    console.log('\n=== 测试1：中型律所（20人团队）===');
    calculator.calculateROI(testData1, cost1, 12).then(result => {
        const report = calculator.generateReport(result);
        console.log('\n=== ROI报告（JSON）===');
        console.log(JSON.stringify(report, null, 2));
        
        console.log('\n=== ROI报告（Markdown）===');
        console.log(calculator.exportToMarkdown(report));
    });

    // 测试数据2：小型律所
    const testData2 = {
        teamSize: 5,
        avgHourlyCost: 300,
        monthlyRevenue: 50
    };

    const cost2 = 100000;

    console.log('\n=== 测试2：小型律所（5人团队）===');
    calculator.calculateROI(testData2, cost2, 12).then(result => {
        const report = calculator.generateReport(result);
        console.log('\n=== ROI报告（JSON）===');
        console.log(JSON.stringify(report, null, 2));
        
        console.log('\n=== ROI报告（Markdown）===');
        console.log(calculator.exportToMarkdown(report));
    });

    // 测试数据3：大型律所
    const testData3 = {
        teamSize: 100,
        avgHourlyCost: 400,
        monthlyRevenue: 500
    };

    const cost3 = 2000000;

    console.log('\n=== 测试3：大型律所（100人团队）===');
    calculator.calculateROI(testData3, cost3, 12).then(result => {
        const report = calculator.generateReport(result);
        console.log('\n=== ROI报告（JSON）===');
        console.log(JSON.stringify(report, null, 2));
        
        console.log('\n=== ROI报告（Markdown）===');
        console.log(calculator.exportToMarkdown(report));
    });
}
