export default class Model {
  constructor () {
    this.data = {
      questions: [
        {
          qid: 'q1',
          title: 'Programmatically navigate using React router',
          text: 'the alert shows the proper index for the li clicked, and when I alert the variable within the last function I\'m calling, moveToNextImage(stepClicked), the same value shows but the animation isn\'t happening. This works many other ways, but I\'m trying to pass the index value of the list item clicked to use for the math to calculate.',
          tagIds: ['t1', 't2'],
          askedBy: 'JoJi John',
          askDate: new Date('January 20, 2023 17:20:00'),
          ansIds: ['a1', 'a2'],
          views: 10
        },
        {
          qid: 'q2',
          title: 'android studio save string shared preference, start activity and load the saved string',
          text: 'I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time i switch to a different view. I just hide/show my fragments depending on the icon selected. The problem i am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what i am using to refrain them from being recreated.',
          tagIds: ['t3', 't4', 't2'],
          askedBy: 'saltyPeter',
          askDate: new Date('February 22, 2022 12:06:12'),
          ansIds: ['a3', 'a4', 'a5'],
          views: 121
        }
      ],
      tags: [
        {
          tid: 't1',
          name: 'react'
        },
        {
          tid: 't2',
          name: 'javascript'
        },
        {
          tid: 't3',
          name: 'android-studio'
        },
        {
          tid: 't4',
          name: 'shared-preferences'
        }
      ],

      answers: [
        {
          aid: 'a1',
          text: 'React Router is mostly a wrapper around the history library. history handles interaction with the browser\'s window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don\'t have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.',
          ansBy: 'hamkalo',
          ansDate: new Date('March 02, 2022 15:30:00')
        },
        {
          aid: 'a2',
          text: 'On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn\'t change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.',
          ansBy: 'azad',
          ansDate: new Date('January 31, 2022 15:30:00')
        },
        {
          aid: 'a3',
          text: 'Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.',
          ansBy: 'abaya',
          ansDate: new Date('April 21, 2022 15:25:22')
        },
        {
          aid: 'a4',
          text: 'YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);',
          ansBy: 'alia',
          ansDate: new Date('December 02, 2022 02:20:59')
        },
        {
          aid: 'a5',
          text: 'I just found all the above examples just too confusing, so I wrote my own. ',
          ansBy: 'sana',
          ansDate: new Date('December 31, 2022 20:20:59')
        }
      ]
    }
  }

  // add methods to query, insert, and update the model here. E.g.,
  getAllQstns () {
    return this.data.questions
  }

  getAllTags () {
    return this.data.tags
  }

  getTagAt (index) {
    return this.data.tags[index]
  }

  getNumQuestions () {
    return this.data.questions.length
  }

  getNumTags () {
    return this.data.tags.length
  }

  getNumAnswers () {
    return this.data.answers.length
  }

  addTag (theTag) {
    this.data.tags.push(theTag)
  }

  addQuestion (theQuestion) {
    this.data.questions.push(theQuestion)
  }

  addViews (question) {
    const questions = this.data.questions
    for (let i = 0; i < questions.length; i++) {
      if (questions[i] === question) {
        questions[i].views = questions[i].views + 1
        return
      }
    }
  }

  addAnswerToQuestID (qid, answer) {
    const questions = this.data.questions
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].qid === qid) {
        questions[i].ansIds.push(answer)
        return
      }
    }
  }

  addAnswer (theAnswer) {
    this.data.answers.push(theAnswer)
  }

  getTagIDFromName (tagName) {
    const tagList = this.data.tags
    for (let i = 0; i < tagList.length; i++) {
      if (tagList[i].name === tagName) { return tagList[i].tid }
    }
    return null
  }

  // Returns list of questions that have tagID
  filterQuestByTagID (tagID) {
    const questions = this.data.questions
    const filtered = []
    for (let i = 0; i < questions.length; i++) {
      const questTagList = questions[i].tagIds
      for (let j = 0; j < questTagList.length; j++) {
        if (questTagList[j] === tagID) {
          filtered.push(questions[i])
          break
        }
      }
    }
    return filtered
  }

  // given index of question array return how many answers for that question
  getNumberOfAnswers (index) {
    return this.data.questions[index].ansIds.length
  }

  getQuestionText (index) {
    return this.data.questions[index].text
  }

  // compartes question ids
  isEqualQuestions (q1, q2) {
    return q1.qid === q2.qid
  }

  getQuestionTitle (index) {
    return this.data.questions[index].title
  }

  // Count of a tag in question
  getCountTag (tagID) {
    const questions = this.data.questions
    let counter = 0
    for (let i = 0; i < questions.length; i++) {
      const questionTags = questions[i].tagIds
      for (let j = 0; j < questionTags.length; j++) {
        if (questionTags[j] === tagID) { counter++ }
      }
    }
    return counter
  }
}
