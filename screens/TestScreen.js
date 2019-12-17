import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MenuButton from '../components/MenuButton';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

export default class TestScreen extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      tests:[],
      questions:[],
      isLoaded:false,
      quizChoosen:false,
      choosenQuizId:"",
      questionsReady:false,

      questionNumber:0,
      totalQuestionsNumber:0,
      numberOfCorrectAnswers:0,
    }
  }

  componentDidMount() {

      fetch('http://www.json-generator.com/api/json/get/bQeTaXPVKa?indent=2')
        .then( res => res.json())
        .then(json => {
          this.setState({
            isLoaded:true,
            tests:json,
          })
        })
        console.log("Załadowano testy")
  }

  getProperQuestions( id ) {
    let properQuestions="";
    if(id == '5ddbd9525531310a5a8f2480')
    {
      properQuestions="http://www.json-generator.com/api/json/get/cfLcNGiOrm?indent=2"
    }
    else if (id == '5ddbd9525531310a5a8f2482')
    {
      properQuestions="http://www.json-generator.com/api/json/get/cntICnZOdK?indent=2"
    }
    else if (id == '5ddbd9525531310a5a8f2481')
    {
      properQuestions="http://www.json-generator.com/api/json/get/bVjyJtxgRK?indent=2"
    }
    else if (id == '5ddbd9525531310a5a8f2483')
    {
      properQuestions='http://www.json-generator.com/api/json/get/bPeRyRfSXm?indent=2'
    }
    else
    {
      alert("error")
    }
    
    fetch(properQuestions)
    .then( res => res.json())
    .then(json => {
      this.setState({
        quizChoosen:true,
        questions:json,
        questionsReady:true,
        totalQuestionsNumber:json.tasks.length,
      })
    })

  }

  render(){

    var { tests, isLoaded, quizChoosen, questions, totalQuestionsNumber, numberOfCorrectAnswers, questionNumber } = this.state;

    if( !isLoaded && !quizChoosen )
    {
      return (
        <View style={styles.menuContainer}>
            <MenuButton navigation={this.props.navigation} />
            <View style={{alignItems:"center",justifyContent:"center"}}>
              <Text style={styles.text}>Ładowanie...</Text>
            </View>
        </View>
      );
    }

    else if (isLoaded && !quizChoosen){
      let tagID = 0;
      return (
        <View style={styles.menuContainerNoPadding}>
          <MenuButton navigation={this.props.navigation} />
          <ScrollView>
            <View style={styles.menuContainer}>
              
              
                      <View style={styles.container}>
                        {tests.map( test =>(
                          <TouchableOpacity  key={test.id} style={styles.touchable} 
                                onPress={()=> this.getProperQuestions(test.id) }>
                            <View style={styles.testContainer}  >
                              <Text style={styles.text}>{test.name}</Text>
                              <Text style={{}}>{test.description}</Text>
                              <Text style={styles.descriptionText}>Poziom: {test.level}</Text>
                              <Text style={styles.descriptionText}>Liczba pytań: {test.numberOfTasks}</Text>
                              
                                {test.tags.map( tag =>(
                                  <Text key={tagID++}>#{tag}</Text>
                                ) )}
                              
                            </View>
                          </TouchableOpacity>
                        ) )}
                      </View>
              
            </View>
          </ScrollView>
        </View>
      );
    }
    else (isLoaded && quizChoosen)
    {

      if( questionNumber < totalQuestionsNumber)
      {
        var answerKey=0;
        console.log(questionNumber);
        console.log(totalQuestionsNumber);
        console.log(numberOfCorrectAnswers);
        return(
            <View style={styles.menuContainer}>
      <Text style={{paddingTop:20, fontWeight:"bold",fontSize:17}} >Pytanie nr {questionNumber+1}</Text>
              <View style={styles.container}>
                
                <View style={styles.questionContainer}>
                  <Text style={styles.questionText}>{questions.tasks[questionNumber].question}</Text>
                </View>
                <View style={styles.allAnswersContainer}>
                {questions.tasks[questionNumber].answers.map(answer => (
                  <TouchableOpacity key={answerKey++} onPress={()=> {this.setState({
                    questionNumber:questionNumber + 1,
                  });
                  if(answer.isCorrect == true )
                  {
                    this.setState({
                      numberOfCorrectAnswers:numberOfCorrectAnswers+1,
                    })
                  }}  }>
                    <View style={styles.answerContainer}>
                      <Text style={styles.answerText}>{answer.content}</Text>
                    </View>
                  </TouchableOpacity>
                ))}

                </View>
              </View>
            </View>

          );
      }
      else
      {
        return(
          <View style={styles.menuContainer}>
            <View style={styles.container}>

            <Text>Twój wynik to: {numberOfCorrectAnswers} na {totalQuestionsNumber}! Gratulacje!</Text>
            <TouchableOpacity onPress={()=> this.setState({
              quizChoosen:false,
              numberOfCorrectAnswers:0,
              questionNumber:0,
              
            })  }>
              <View style={styles.answerContainer}>
                <Text>Wróć</Text>
              </View>
            </TouchableOpacity>
            </View>
          </View>
        );
      }
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFAF53',
    alignItems:"stretch",
    justifyContent:'space-around',
    minWidth: Math.round(Dimensions.get('window').width)-40,
  },
  menuContainer:{
    flex:3,
    justifyContent:"flex-start",
    alignItems:"flex-start",
    padding:20,

    paddingBottom:0,
    backgroundColor:"#FFAF53",
  },
  menuContainerNoPadding:{
    flex:3,
    justifyContent:"flex-start",
    alignItems:"flex-start",
    paddingTop:30,
    paddingBottom:0,
    backgroundColor:"#FFAF53",
  },
  
  questionContainer:{

    alignItems:"center",
    justifyContent:"center",
    padding:10,
    minHeight:50,
    backgroundColor:"#E88554",
    borderColor:"#E55D4A",
    borderWidth:3,
    minHeight:230,
    borderRadius:10,
  },

  answerContainer:{

    alignItems:"center",
    justifyContent:"center",
    padding:10,
    backgroundColor:"#E88554",
    borderColor:"#E55D4A",
    minHeight:65,
    borderWidth:3,
    borderRadius:10,
    marginBottom:5,

  },
  allAnswersContainer:{
    alignItems:"stretch",
    justifyContent:"space-around",
  },

  endButton:{
    alignItems:"center",
    justifyContent:"center",
    padding:10,
    minHeight:50,
    backgroundColor:"#E88554",
    borderColor:"#E55D4A",
    borderWidth:3,
  },
  questionText:{
    fontSize:19,
    fontWeight:"bold",

  },
  answerText:{
    fontSize:16,
  },

  text:{
    fontSize:24,
    fontWeight:"bold",
    padding:7,
  },
  testContainer:{
    alignItems:"flex-start",
    justifyContent:"flex-start",
    padding:10,
    minHeight:260,
    backgroundColor:"#E88554",
    borderColor:"#E55D4A",
    borderWidth:3,
    borderRadius:10,
    marginBottom:20,
    
  },

  descriptionText:{
    fontWeight:"bold",
    paddingTop:4,
    paddingBottom:4,
  }
});