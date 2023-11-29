import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import { Button, H3, TextBody, Radio } from 'components';
import { withRouter } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { Number } from 'core-js';
import {
  getListTestClass,
  getTestQuestion,
  postTestAnswer,
  postDoneTest
} from '../../../../../services';

class FormTestQuestion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nonce: uuidv4(),
      titleTest: '',
      testId: null,
      questions: {},
      answers: [],
      errors: [],
      paramsQuestion: {
        limit: 4,
        offset: 0
      }
    };
  }

  componentDidMount() {
    this.getListTestClass();
  }

  componentDidUpdate(prevprevProps, prevState, snapshotState) {
    const { paramsQuestion } = this.state;
    if (prevState.paramsQuestion !== paramsQuestion) {
      this.getTestQuestion();
    }
  }

  getListTestClass = () => {
    const { match } = this.props;
    const { classId } = match.params;
    const params = {
      class_id62: classId
    };

    return new Promise((resolve) => {
      getListTestClass(params).then(({ data }) => {
        if (data.length) {
          this.setState({
            testId: data[0].id62
          });
          this.getTestQuestion();
        }
        resolve();
      });
    });
  };

  getTestQuestion = () => {
    const { paramsQuestion, testId } = this.state;
    return new Promise((resolve) => {
      getTestQuestion(testId, paramsQuestion).then(({ data }) => {
        const questions = data.questions;
        this.setState({
          questions,
          titleTest: data.display_name
        });
        resolve();
      });
    });
  };

  hasError = (questionId) => {
    const { errors } = this.state;
    return errors.map((error) => error.id62).includes(questionId);
  };

  handleSelectedAnswer = (questionId, choiceId) => {
    const { nonce, answers } = this.state;
    const selectedData = {
      nonce,
      question_id62: questionId,
      answers: [{ id62: choiceId }]
    };
    const newAnswers = [selectedData, ...answers];
    const filteredAnswers = newAnswers.filter(
      (arr, index, self) =>
        index === self.findIndex((t) => t.question_id62 === arr.question_id62)
    );
    this.setState({
      answers: filteredAnswers
    });
  };

  handleChangePage = (offset) => {
    const { paramsQuestion } = this.state;
    this.setState({
      paramsQuestion: {
        ...paramsQuestion,
        offset
      }
    });
  };

  handlePostAnswer = (status) => {
    const { testId, answers } = this.state;
    const data = {
      test_id62: testId,
      answers
    };
    postTestAnswer(data).then(() => {
      if (status === 'done') {
        this.handleDoneTest();
      }
    });
  };

  handleDoneTest = () => {
    const { nonce } = this.state;
    const { handleResult } = this.props;
    postDoneTest({ nonce }).then(() => {
      handleResult();
    });
  };

  render() {
    const { titleTest, answers, questions, paramsQuestion } = this.state;
    const { titleClass } = this.props;
    const classNames = classname('content-modules', {});

    const totalAnswer = answers.length;
    const nextAvailable =
      totalAnswer >=
      Number(paramsQuestion.offset || 0) + Number(paramsQuestion.limit);
    const allAnswered = totalAnswer === questions.count;

    const ItemQuestion = ({ question }) => {
      const answer = answers.find(
        (answer) => answer.question_id62 === question.id62
      );
      const answerIds = answer ? answer.answers.map(({ id62 }) => id62) : [];
      return (
        <>
          {question?.choices.map((choice) => (
            <div key={choice.id62} className="form-relative">
              <Radio
                id={choice.id62}
                name={`radio-${question.id62}`}
                isChecked={answerIds.includes(choice.id62)}
                className={{ 'is-error': this.hasError(question.id62) }}
                onChange={() =>
                  this.handleSelectedAnswer(question.id62, choice.id62)
                }
              >
                <TextBody color="black" weight="black">
                  {choice.display_name}
                </TextBody>
              </Radio>
            </div>
          ))}
        </>
      );
    };

    return (
      <div className={classNames}>
        <div className="test-question">
          <H3>{titleTest || titleClass}</H3>
          <div className="title-deskripsi">
            {questions.results ? (
              <TextBody color="grey">
                Jawab pertanyaan dengan jawaban benar atau salah
              </TextBody>
            ) : (
              <TextBody color="grey">
                Maaf, Belum ada pertanyaan tersedia
              </TextBody>
            )}
            <div className="test-question__list">
              <ol start={Number(paramsQuestion.offset) + 1}>
                {questions?.results?.map((question) => (
                  <li key={question.id62} className="test-question__list--item">
                    <TextBody>{question.title}</TextBody>
                    <ItemQuestion question={question} />
                  </li>
                ))}
              </ol>
            </div>
          </div>
          <div className="test-question__action">
            {questions.previous ? (
              <Button
                variant="secondary"
                onClick={() => {
                  const prevOffset = questions.previous?.split('offset=');
                  this.handleChangePage(prevOffset[1]);
                }}
              >
                Kembali
              </Button>
            ) : (
              <div />
            )}
            {questions.next ? (
              <Button
                variant="primary"
                onClick={() => {
                  const nextOffset = questions.next?.split('offset=') || null;
                  this.handleChangePage(nextOffset[1]);
                }}
                disabled={!nextAvailable}
              >
                Selanjutnya
              </Button>
            ) : (
              <Button
                variant="primary"
                onClick={() => this.handlePostAnswer('done')}
                disabled={!allAnswered}
              >
                Selesai
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

FormTestQuestion.propTypes = {
  match: PropTypes.object,
  handleResult: PropTypes.func,
  titleClass: PropTypes.string
};

FormTestQuestion.defaultProps = {
  match: {},
  handleResult: () => {},
  titleClass: ''
};

export default withRouter(FormTestQuestion);
