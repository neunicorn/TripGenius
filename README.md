In the machine learning model development phase, several steps need to be taken.

# Dataset
The dataset is the most important component needed to create a machine-learning model. To obtain a suitable dataset, we perform several stages as follows:

Extraction Stage:
  In this stage, data is searched and extracted from a source. For the current case, we 
  obtained the dataset from Kaggle.

Cleansing Stage:
  In the cleansing stage, the data is processed to clean it by renaming tables or columns 
  and removing unused tables or columns. This is done to ensure that the dataset aligns 
  with our required dataset.

Transformation Stage:
  After performing the cleaning process, the transformation stage is carried out. The 
  transformation process aims to obtain the required tables, such as merging two or more 
  tables.

# Data Visualization with Seaborn and Matplotlib
In this project, we utilize the Seaborn and Matplotlib libraries for data visualization. Seaborn is a library that enables the creation of attractive and informative data visualizations, while Matplotlib provides more detailed control over visualization aspects. By utilizing Seaborn and Matplotlib, we can generate various types of plots such as scatter plots, bar plots, histograms, heatmaps, and box plots. We use functions from both libraries to create plots that suit the characteristics of the data we want to visualize. Once the plots are created, we can add labels to the x-axis and y-axis, a plot title, and annotations to provide clear context and information. Functions such as plt.xlabel(), plt.ylabel(), plt.title(), and others are used for this purpose. Finally, we display the plot using plt.show() and save it as an image file using plt.savefig('file_name.png'). By utilizing Seaborn and Matplotlib, we can generate informative and visually appealing data visualizations. Data visualization aids in analyzing, identifying patterns, and drawing useful conclusions from the available dataset.

# Data Encoding
Once the dataset is obtained, we convert each string column into integers using encoding techniques. We convert the columns to be used from string to integer because the testing and training processes only accept integer inputs.

# Building the Machine Learning Model
After acquiring the necessary data, we can proceed to create the model to be used in the training and testing stages. The training stage involves training the data to predict certain outcomes. The testing stage, on the other hand, checks the predictions obtained from the previous training stage. Following the completion of the training and testing stages, we visualize the results using the predefined evaluation matrices. The evaluation matrices used can include accuracy and Root Mean Squared Error (RMSE). In this project, we create 3 machine-learning models. The machine learning algorithms utilized are Artificial Neural Networks (ANN) and Cosine Similarity. The machine learning algorithms used are Artificial Neural Networks (ANN) and Cosine Similarity. To create the Artificial Neural Networks model we use an additional library, namely TensorFlow and to create the Cosine Similarity model use the Scikit-learn library. After performing the training and testing stages using these models, we evaluate them using the Root Mean Squared Error (RMSE) evaluation matrix to identify the best model.

# Using Flask to Aid the Deployment Process
Once we obtain the best model, we employ Flask to assist in the deployment process of the completed model. Flask is a lightweight and flexible web framework for Python. Although not specifically designed for machine learning, Flask can be highly useful in integrating machine learning models into web applications. After incorporating the model into Flask, we deploy the model using Google Cloud Run.




