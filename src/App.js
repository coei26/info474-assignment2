import React from "react";
import { useFetch } from "./hooks/useFetch";
import Plot from "react-plotly.js";


const App = () => {
    const [data] = useFetch(
        "https://raw.githubusercontent.com/fivethirtyeight/data/master/hate-crimes/hate_crimes.csv"
    );
    console.log((data));
    
    let states = getColumn(data, "state");
    console.log(states);
    let hate_crimes = getColumn(data, "avg_hatecrimes_per_100k_fbi");
    console.log(hate_crimes);
    let trump = getColumn(data, "share_voters_voted_trump");
    console.log(trump);
    let education = getColumn(data, "share_population_with_high_school_degree");
    console.log(education);
    let income = getColumn(data, "median_household_income");
    console.log(income);
    let gini = getColumn(data, "gini_index");
    console.log(gini);
    return (
        <div>
            <div className="container">
                <Dataset/>
                <Questions />
                <h2>Exploratory Visual Analysis</h2>
                <br></br>
                <Overview/>
                <br></br>
                <h4>Investigations</h4>
                <h5>#1: bar chart of hate crime rates across the United States</h5>
                <Plot
                    data={[{
                        x: states,
                        y: hate_crimes,
                        type: 'bar',
                        marker: {color: 'black'}
                    }]}
                    layout={{
                        width: 1000,
                        height: 700,
                        title: 'Hate Crimes Rates Across the United States',
                        xaxis: {title: 'states',
                                tickangle: -90,
                                automargin: true},
                        yaxis: {title: 'average hate crimes per 100,000 people'}
                    }}
                />
                <p>
                    At first glance, the "state" that appears to have the highest rate of hate crime is the District of Columbia (although it is a city, not a state), and Hawaii
                    appears to have the lowest hate crime rate. However, examining the true data reveals that Hawaii does not have any data for hate crimes and therefore cannot be
                    considered in this particular visualization. While it seems like D.C. has the highest crime rate, there are still other factors to consider. D.C. is bordered by
                    Maryland and Virginia, so why aren't those states' hate crime rates very high compared to other states? Is it because D.C. is completely metropolitan?
                    What if we compared the hate crime rate in D.C. to other large cities in the United States? While the bar chart demonstrates
                    seemingly "obvious" trends, it is important to take time to understand the data, because what is being displayed may not be a true representation of the
                    question the visualization attempts to answer. Finally, it is important to take note of the scale. The highest hate crime rate is in D.C., which is about 10
                    for every 100,000 people. That is just 0.01%, which is really very miniscule, leading me to wonder if hate crime really is such a critical issue in the US.
                </p>
                <h5>#2: bar chart of Donald Trump voters across the United States</h5>
                <Plot
                    data={[{
                        x: states,
                        y: trump,
                        type: 'bar',
                        marker: {color: 'black'}
                    }]}
                    layout={{
                        width: 1000,
                        height: 500,
                        title: 'Donald Trump Voters Across the United States',
                        xaxis: {title: 'states',
                                tickangle: -90,
                                automargin: true},
                        yaxis: {title: 'proportion of Trump voters'}
                    }}
                />
                <p>
                    Following the 2016 presidential election, I can recall countless news stories attributing hate crimes to Donald Trump's presidency, often pointing at Trump 
                    voters as perpetrators. However, looking at this bar chart compared to the previous, there does not appear to be a connection between the proportion of
                    Trump voters in a state, and the respective state's hate crime rate. For example, states like Wyoming and Texas had very low hate crime rates, but generally
                    higher proportions of Trump voters.
                </p>
                <p>
                    In examining the features of this visualization, the scale of this chart is potentially misleading. It makes all the 
                    states appear to have very large shares of Trump voters, when in reality, most states are at around 0.5 or less. This demonstrates that America was quite split 
                    in voting during the 2016 election.
                </p>
                <h5>#3: scatterplot of hate crime rates vs. Donald Trump voters</h5>
                <Plot
                    data={[{
                        x: trump,
                        y: hate_crimes,
                        mode: 'markers',
                        type: 'scatter',
                        marker: {color: 'black',
                                 size: '8'}
                    }]}
                    layout={{
                        width: 600,
                        height: 600,
                        title: 'Hate Crime Rate vs. Donald Trump Supporters',
                        xaxis: {title: 'proportion of Trump voters'},
                        yaxis: {title: 'average hate crime rate'}
                    }}
                />
                <p>
                    In investigation of question 2, to further explore whether hate crimes are correlated to states with greater proportions of Donald Trump voters, this scatterplot proves to be a
                    more effective visualization for this relationship. Most points are conglomerated towards the bottom right, and we can hypothesize that the r-squared value would be quite low
                    due to the distribution of points. There is one significant outlier, however, which we know is the District of Columbia from the previous graphs. This supports 
                    my suspicion that the data for D.C. might not be reasonable to compare to other states, as it is a city, not a state. If we disregard the outlier and
                    focus only on the bottom right, there appears to be a weak negative association between hate crime rate and Donald Trump voters for some reason. This suggests that
                    as the proportion of Trump voters in a given state increases, the average hate crime rate in the state tends to decrease, but again, the correlation is very weak.
                    Rather than comparing two bar plots between each other, a scatterplot proves to be much more effective when provided with quantitative data in order to determine
                    the relationship between two variables. The particular exploration of the two variables, 'share_voters_voted_trump' and 'avg_hatecrimes_per_100k_fbi' 
                    demonstrate the importance of being thoughtful when selecting the types of charts with which to visualize your data. 
                </p>
                <h5>#4: scatterplot of hate crime rates vs. high school education</h5>
                <Plot
                    data={[{
                        x: education,
                        y: hate_crimes,
                        mode: 'markers',
                        type: 'scatter',
                        marker: {color: 'black',
                                 size: '8'}
                    }]}
                    layout={{
                        width: 600,
                        height: 600,
                        title: 'Hate Crime Rate vs. High School Education Level',
                        xaxis: {title: 'proportion of population with high school degree'},
                        yaxis: {title: 'average hate crime rate'}
                    }}
                />
                <p>
                    In investigation of question 3, this scatterplot displays the relationship between average hate crime rates and the proportion of the population with a high
                    school degree. Even if the outlier were disregarded, the scatterplot would still show a very weak association. There does not appear to be a correlation between the
                    the proportion of the population in a state who have completed a high school degree and the hate crime rate. The lack of education as a factor when examining
                    the reasons behind hate crimes is a valid assumption. However, this visualization dismantles the idea that education is the sole contributing factor. I would be
                    curious to see what the scatterplot would look like if the level of education being compared was a bachelor's degree. 
                </p>
                <h5>#5: scatterplot of hate crimes vs. median household income</h5>
                <Plot
                    data={[{
                        x: income,
                        y: hate_crimes,
                        mode: 'markers',
                        type: 'scatter',
                        marker: {color: 'black',
                                 size: '8'}
                    }]}
                    layout={{
                        width: 600,
                        height: 600,
                        title: 'Hate Crime Rate vs. Median Household Income',
                        xaxis: {title: 'median household income'},
                        yaxis: {title: 'average hate crime rate'}
                    }}
                />
                <p>
                    In investigation of question 4, this scatterplot displays the relationship between average hate crime rates and the median household income across the
                    United States. Similarly to the previous graph, even if the outlier were removed, the scatterplot would still display a very weak association, showing 
                    no correlation between hate crime rates and median household income. This is interesting because the affluence of people living in a state does not 
                    appear to have a connection to the rates of hate crimes. We normally associate wealth to stability and success, and think of people who commit hate crimes
                    to be quite the opposite of that. This dataset shows no correlation between the two. 
                </p>
                <h5>#6: boxplot of income inequality in the United States</h5>
                <Plot
                    data={[{
                        x: gini,
                        type: 'box',
                        name: 'Gini Index',
                        marker: {color: 'black'}
                    }]}
                    layout={{
                        width: 1000,
                        height: 300,
                        title: 'Income Inequality in the United States',
                        xaxis: {title: 'income inequality across 50 states'}
                    }}
                />
                <Plot
                    data={[{
                        x: gini,
                        type: 'box',
                        name: 'Gini Index  ',
                        marker: {color: 'black'}
                    }]}
                    layout={{
                        width: 1000,
                        height: 300,
                        title: 'Income Inequality in the United States',
                        xaxis: {title: 'income inequality across 50 states',
                                range: [0, 1]}
                    }}
                />
                <p>
                    A boxplot can be a very helpful tool for pre-processing and exploratory data analysis to quickly visualize the range of a given variable. In this case, 
                    I demonstrate how the Gini Index variable was explored, but I repeated this process for other variables in the data in a separate application during my EDA. For some
                    context, the Gini Index is a coefficient measuring the distribution of income across a population. 0 represents perfect <i>equality</i> and 1 represents
                    perfect <i>inequality</i>. The Gini Index is most commonly used as a measure of income inequality by economists. Once again, the scale of a visualization
                    impacts the absorption and perception of information by viewers. In the top plot, it would appear that the range of income inequality in the United States
                    has quite a wide level of variation. However, in the full Gini Index scale in the bottom plot, you can see that the variation in income inequality is not
                    as large as it seems in the top plot, and interestingly, it seems to be quite symmetrical (excluding the outlier).
                </p>
                <h5>#7: scatterplot of the proportion of Trump voters vs. income inequality</h5>
                <Plot
                    data={[{
                        x: gini,
                        y: trump,
                        mode: 'markers',
                        type: 'scatter',
                        marker: {color: 'black',
                                 size: '8'}
                    }]}
                    layout={{
                        width: 600,
                        height: 600,
                        title: 'Proportion of Trump Voters vs. Income Inequality',
                        xaxis: {title: 'income inequality (Gini Index)'},
                        yaxis: {title: 'proportion of Trump voters'}
                    }}
                />
                <p>
                    In this visualization, I was personally interested in exploring if income inequality across states had a connection to the proportion of Trump voters
                    in that particular state. Though the association is weak, there appears to be a slight negative correlation between the two variables. As income inequality
                    increases, the proportion of Trump voters in a state decreases. This is quite striking. States with arguably better economic stability (smaller income gaps)
                    generally had greater proportions of Trump voters. This is an example of a visualization that displays some information, but we still find that it is still difficult
                    to draw an inference as to why the relationship might exist between the variables. 
                </p>
                <h5>#8: scatterplot of hate crime rate vs. income inequality</h5>
                <Plot
                    data={[{
                        x: gini,
                        y: hate_crimes,
                        mode: 'markers',
                        type: 'scatter',
                        marker: {color: 'black',
                                 size: '8'}
                    }]}
                    layout={{
                        width: 600,
                        height: 600,
                        title: 'Hate Crime Rate vs. Income Inequality Index',
                        xaxis: {title: 'income inequality (Gini Index)'},
                        yaxis: {title: 'average hate crime rate'}
                    }}
                />
                <p>
                    Finally, in investigation of the last question, this scatterplot displays the relationship between average hate crime rates and 
                    income inequality in the United States. The association appears to be very weak, even if the outlier were removed. This is particularly
                    confusing because the <a href="https://fivethirtyeight.com/features/higher-rates-of-hate-crimes-are-tied-to-income-inequality/">article </a> 
                    for which this dataset was behind expressed that "income inequality was the most significant determinant of population-adjusted hate crimes
                    and hate incidents across the United States". Looking at this scatterplot, this statement does not appear to be very convincing. There might exist a 
                    very weak positive association between income inequality and average hate crime rates in states at best. The article suggests that as
                    income inequality increases, hate crimes also increase. I'm not sure that I am very convinced of this even if a true linear regression
                    test were performed. 
                </p>
                <Summary/>
            </div>
        </div>
  );
};

const Dataset = () => {
    return(
        <div>
            <h2>The Dataset</h2>
                <p>The <a href="https://github.com/fivethirtyeight/data/tree/master/hate-crimes">data</a> used for this assignment is the dataset 
                    behind the FiveThirtyEight article, <a href="https://fivethirtyeight.com/features/higher-rates-of-hate-crimes-are-tied-to-income-inequality/">"Higher Rates Of Hate Crimes Are Tied To Income Inequality"</a>
                    by Maimuna Majumder. The type of the dataset is a <b>flat table</b>, where each key is a specific state in the United States. The adjacent columns all represent
                    various attributes of each respective state, ranging from median household income, to the average annual hate crimes per 100,000 in a population
                    by the FBI. These values offer a more comprehensive evaluation for understanding why hate crimes occur.
                </p>
        </div>
    )
}

const Questions = () => {
    return(
        <div>
            <h2>Investigating Questions</h2>
                <ol>
                    <li>How does the rate of hate crimes vary across states?</li>
                    <li>Is there a correlation between Donald Trump voters and hate crimes rates?</li>
                    <li>How might education correlate to hate crimes?</li>
                    <li>How might household income correlate to hate crimes?</li>
                    <li>How might income inequality correlate to hate crimes?</li>
                </ol>
        </div>
    )
}
const Overview = () => {
    return(
        <div>
            <h4>Overview of Dataset</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">VARIABLE</th>
                            <th scope="col">SEMANTICS</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>state</td>
                            <td>Key</td>
                            <td>Name of the state</td>
                        </tr>
                        <tr>
                            <td>median_household_income</td>
                            <td>Value</td>
                            <td>Median household income in 2016</td>
                        </tr>
                        <tr>
                            <td>share_unemployed_seasonal</td>
                            <td>Value</td>
                            <td>The share of the population that is unemployed (seasonally adjusted), from September 2016</td>
                        </tr>
                        <tr>
                            <td>share_population_in_metro_areas</td>
                            <td>Value</td>
                            <td>The share of the population living in metropolitan areas in 2015</td>
                        </tr>
                        <tr>
                            <td>share_population_with_high_school_degree</td>
                            <td>Value</td>
                            <td>The share of adults that are 25 and older with a high school degree in 2009</td>
                        </tr>
                        <tr>
                            <td>share_non_citizen</td>
                            <td>Value</td>
                            <td>The share of the population that are not United States citizens in 2015</td>
                        </tr>
                        <tr>
                            <td>share_white_poverty</td>
                            <td>Value</td>
                            <td>The share of white residents living in poverty in 2015</td>
                        </tr>
                        <tr>
                            <td>gini_index</td>
                            <td>Value</td>
                            <td>The Gini Index from 2015. The Gini Index is a coefficient measuring the distribution of income across a population.
                                0 represents perfect equality, 1 represents perfect inequality. It is commonly used as a measure of income inequality by 
                                economists.
                            </td>
                        </tr>
                        <tr>
                            <td>share_non_white</td>
                            <td>Value</td>
                            <td>The share of the population that is not white in 2015</td>
                        </tr>
                        <tr>
                            <td>share_voters_voted_trump</td>
                            <td>Value</td>
                            <td>The share of voters in the 2016 US presidential election who voted for Donald Trump </td>
                        </tr>
                        <tr>
                            <td>hate_crimes_per_100k_splc</td>
                            <td>Value</td>
                            <td>Hate crimes per population of 100,000 by the Southern Poverty Law Center, Nov. 9-18, 2016</td>
                        </tr>
                        <tr>
                            <td>avg_hate_crimes_per_100k_fbi</td>
                            <td>Value</td>
                            <td>Average annual hate crimes per population of 100,000 by the FBI, 2010-2015</td>
                        </tr>
                    </tbody>
                </table>
                <br></br>
                <p><b>DISTRIBUTION OF VARIABLES</b></p>
                <p>
                    I explored the distribution of variables using a separate application where I created box plots for each of the
                    quantitative variables. Using box plots was very helpful for quickly visualizing the distribution of a variable.
                    Box plots were also helpful because they provided me with metrics like the median and interquartile ranges, and also
                    helped identify outliers. I chose to avoid variables that contained a greater number of missing values since I wanted 
                    to conduct a full comprehensive study that would include all 50 states. 
                </p>
                <br></br>
                <p><b>DATA QUALITY ISSUES</b></p>
                <p>
                    There are a few empty values in the dataset. Most notably, the hate crime variables for the state of Hawaii are
                    missing. This makes it impossible to know whether the data from Hawaii may have skewed the distribution or strengthened
                    a discovered correlation. Additionally, there is variation in the years of the data--some from 2015, 2016, even
                    one from 2009. This impacts the soundness of the conclusions we might seek to draw from visualizations created by this
                    dataset.
                </p>
        </div>
    )
}

const getColumn = (data, name) => {
    let values = [];
    for (let i = 0; i < data.length; i++) {
        values.push(data[i][name]);
    }
    return values
}

const Summary = () => {
    return(
        <div>
            <h2>Summary</h2>
            <p>
                To explain my analysis process, I will first reiterate the questions I investigated below:
                <ol>
                    <li>How does the rate of hate crimes vary across states?</li>
                    <li>Is there a correlation between Donald Trump voters and hate crimes rates?</li>
                    <li>How might education correlate to hate crimes?</li>
                    <li>How might household income correlate to hate crimes?</li>
                    <li>How might income inequality correlate to hate crimes?</li>
                </ol>
                After writing out the questions I was curious in investigating, I performed an in-depth EDA of the dataset. 
                In a separate application, I explored the distribution of variables by creating boxplots, and I took note of 
                any data quality issues I encountered. The process of identifying data quality issues greatly supplemented
                my interpretations of the 8 visualizations I later created. I knew which variables would likely yield unreliable
                results, and because of this, I found that I was able to write more impartial explanations and captions for each
                of the visualizations. In terms of data transformations, I wote a JS function to select subsets of the data in order
                to explore specific variables in detail.
            </p>
            <p>
                Especially since this dataset was the dataset behind an article that had already been written, I was quite surprised at my findings.
                I was not convinced by the claims the article made based on my exploration of this dataset. One of the biggest issues I
                noticed were the inconsistencies in years for which the data was collected. For example, the hate crime data used was an
                average rate from 2010 to 2015, and in the article, to draw a conclusion about how Donald Trump's presidency impacted hate 
                crime rates, they compared the latter five year average to hate crime data averaged from a period of just one week after the election. 
                To me, this does not seem like reliable enough data to draw any type of conclusion or make any inference of the kind they made. I also noticed that
                the inconsistencies in years persisted throughout the dataset for different variables, as I mentioned in my data quality issues section. My conclusion
                from the EDA process I underwent was that hate crimes are an incredibly complex economical and social issue involving a variety of factors that this dataset might
                not even contain. One single variable cannot begin to explain the depth of the issue.
            </p>
            <p>
                One of the main lessons I learned was that even when given a visualization that displays a relationship or correlation between
                variables, it is still a challenging task to assert and explain <i>why</i> that relationship might exist. Another lesson I learned was that the scale of
                a graph is super super important to pay attention to before drawing any type of generalization about data. What may seem like a high level of variance
                might not really be so when evaluating a plot using the true scale, like in the case of the Gini Index's 0-1 scale. Finally, I learned why EDA is such a
                critical process to go through before creating visualizations. When reading the FiveThirtyEight article and looking at their visualizations,
                it was easy to simply accept the information being conveyed because the writer seemed to employ statistics and leverage thorough graphical analysis. However,
                upon conducting my own EDA of the dataset they used, I became unconvinced of the points they were drawing. Perhaps their points are valid,
                but I do not believe their points can be supported from this particular dataset they used. I think this also demonstrates how important it is to
                be discerning of everything you read, even if it is on the news and even if statistics and graphs are used. The best way to have an informed opinion is to
                conduct an EDA of the data yourself, and let that be the guide for what you choose to believe.
            </p>
            <br></br>
        </div>
    )
}

export default App;