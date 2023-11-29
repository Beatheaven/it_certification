import React, { Component, useState } from 'react';
import classname from 'classnames';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import _sortBy from 'lodash/sortBy';
import _indexOf from 'lodash/indexOf';
import _uniqBy from 'lodash/uniqBy';

// COMPONENTS
import {
  Button,
  H4,
  Navbar,
  HeaderBanner,
  CardProgressBar,
  CardFormSurvey,
  CheckBox,
  Radio,
  InputTextArea,
  Skeleton,
  TextBody,
  Notification
} from 'components';

// SERVICES
import {
  surveyProgress,
  surveyGroup,
  surveyGroupId,
  answerBulk,
  answerDone,
  answerId,
  surveyLastAnswer
} from '../../../services';

// STYLES
import './styles.scss';

// ASSETS
import ImageHeaderBanner from '../../../assets/images/banner/header-banner-survey-kopetensi.png';
import ImageHeaderBannerMobile from '../../../assets/images/banner/header-banner-survey-kopetensi-mobile.png';
import Caret from '../../../assets/images/icon-caret.svg';

const errorTemplates = {
  radio: 'Pilih salah satu',
  checkbox: 'Pilih setidaknya satu'
};

class FormSurvey extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breadcrumbs: [
        { title: 'UMKM Smart', withArrow: true },
        { title: 'Survey Kompetensi', withArrow: false }
      ],
      nonce: null,
      isLoading: true,
      isSubmitting: false,
      progress: 0,
      firstGroup: null,
      lastGroup: null,
      lastGroupAnswered: null,
      currentGroup: null,
      groupTitle: '',
      surveyGroups: [],
      questions: null,
      answers: [],
      answerCodes: {},
      errors: [],
      alert: ''
    };
    this.handleSelectAnswer = this.handleSelectAnswer.bind(this);
    this.handleInputAnswer = this.handleInputAnswer.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.getSurveyGroup().then(() => {
      this.getSurveyProgress();
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentGroup } = this.state;
    if (currentGroup !== null && currentGroup !== prevState.currentGroup) {
      this.populateForm().then(() => {
        this.formatSurveyGroups();
        this.formatQuestions();
      });
    }
  }

  // METHODS
  populateForm = () => {
    return Promise.all([
      this.getSurveyQuestions(),
      this.getSurveyAnswers(),
      this.getSurveyLastAnswers(),
      this.getSurveyProgress()
    ]).then(() => this.setState({ isLoading: false }));
  };

  hasError = (questionId) => {
    const { errors } = this.state;
    return errors.map((error) => error.id62).includes(questionId);
  };

  removeError = (questionId) => {
    const { errors } = this.state;
    const clonedErrors = _uniqBy([...errors], ({ id62 }) => id62);
    const errorIndex = clonedErrors.findIndex(
      ({ id62 }) => id62 === questionId
    );
    clonedErrors.splice(errorIndex, 1);
    this.setState({ errors: clonedErrors });
    if (!clonedErrors.length) this.setState({ alert: '' });
  };

  getStatus = (id) => {
    const { currentGroup, lastGroupAnswered } = this.state;
    if (id === currentGroup) return 'is-active';
    if (id <= lastGroupAnswered) return 'is-done';
    return '';
  };

  formatSurveyGroups = () => {
    const { surveyGroups } = this.state;
    this.setState({
      isLoading: false,
      surveyGroups: surveyGroups.map((group, index) => ({
        ...group,
        status: this.getStatus(group.id62),
        text: group.display_name,
        withLine: index !== surveyGroups.length - 1,
        value: `${index + 1}`
      }))
    });
  };

  formatQuestions = () => {
    const { questions } = this.state;
    if (!questions) return;
    const newQuestions = questions.map((question) => {
      const { choices } = question;
      const orders = { trueFalse: ['true', 'false'] };

      const hasOrder = (order) =>
        choices.every(({ code }) => orders[order].includes(code));
      const sortChoicesBy = (order) =>
        _sortBy(choices, ({ code }) => _indexOf(orders[order], code));

      const order = Object.keys(orders).find((key) => hasOrder(key));
      const newChoices = order ? sortChoicesBy(order) : choices;

      return { ...question, choices: newChoices };
    });
    this.setState({ questions: newQuestions });
  };

  // SERVICES
  getSurveyGroup = () => {
    return new Promise((resolve) => {
      surveyGroup().then(({ data }) => {
        const surveyGroups = data.results;
        this.setState({
          surveyGroups,
          firstGroup: surveyGroups[0]?.id62,
          lastGroup: surveyGroups[surveyGroups.length - 1]?.id62
        });
        resolve();
      });
    });
  };

  getSurveyProgress = () => {
    const { surveyGroups, currentGroup } = this.state;
    return new Promise((resolve) => {
      surveyProgress().then(({ data }) => {
        const lastIndex = surveyGroups.findIndex(
          ({ id62 }) => id62 === data.last_group_answer
        );
        const nextIndex = lastIndex < 0 ? 0 : lastIndex + 1;

        this.setState({
          lastGroupAnswered: data.last_group_answer,
          progress: data.progress,
          nonce: data.nonce || uuidv4(),
          currentGroup: currentGroup ?? surveyGroups[nextIndex]?.id62
        });
        resolve();
      });
    });
  };

  getSurveyQuestions = () => {
    const { currentGroup } = this.state;
    return new Promise((resolve) => {
      surveyGroupId(currentGroup).then(({ data }) => {
        const questions = data.questions.results;
        this.setState({
          groupTitle: data.display_name,
          questions
        });
        if (!questions) this.setState({ alert: data.questions });
        resolve();
      });
    });
  };

  getSurveyLastAnswers = () => {
    return new Promise((resolve) => {
      surveyLastAnswer().then(({ data }) => {
        this.setState({ answerCodes: data });
        resolve();
      });
    });
  };

  getSurveyAnswers = () => {
    const { currentGroup } = this.state;
    return new Promise((resolve) => {
      answerId(`${currentGroup}/submitted`)
        .then(({ data }) => this.setState({ answers: data.answers }))
        .finally(() => resolve());
    });
  };

  postAnswers = () => {
    const { currentGroup, answers, lastGroup } = this.state;
    this.setState({ errors: [], alert: '', isSubmitting: true });
    answerBulk({ group_id62: currentGroup, answers })
      .then(() => {
        if (currentGroup === lastGroup) {
          this.postAnswerDone();
        } else {
          this.handleChangePage(1);
        }
      })
      .catch(({ response: { data } }) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        this.setState({
          errors: data.errors,
          alert: 'Lengkapi data berikut'
        });
      })
      .finally(() => {
        this.setState({ isSubmitting: false });
      });
  };

  postAnswerDone = () => {
    const { nonce } = this.state;
    const { history } = this.props;
    answerDone({ nonce }).then(() => {
      history.push('/riwayat-survey');
    });
  };

  handleChangePage = (pointer) => {
    const { surveyGroups, currentGroup } = this.state;
    const firstIndex = 0;
    const lastIndex = surveyGroups.length - 1;
    const currentIndex = surveyGroups.findIndex(
      ({ id62 }) => currentGroup === id62
    );
    const destIndex =
      currentIndex <= firstIndex
        ? firstIndex + pointer
        : currentIndex >= lastIndex
        ? lastIndex + pointer
        : currentIndex + pointer;

    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.setState({
      currentGroup: surveyGroups[destIndex].id62,
      errors: [],
      alert: '',
      isLoading: true
    });
  };

  // SUB-COMPONENTS
  activeGroup = () => {
    const {
      isLoading,
      groupTitle,
      questions,
      alert,
      answerCodes,
      currentGroup,
      firstGroup
    } = this.state;
    const inputs = {
      checkbox: this.checkboxInput,
      radio: this.radioInput,
      text: this.textInput
    };
    // check if choice conditions are met
    const hasCondition = (question, choiceCode) =>
      question.conditions?.some(({ choices, dependency }) => {
        const { code, answer } = dependency;
        const hasQuestion = Object.keys(answerCodes).includes(code);
        const hasAnwer = answerCodes[code]?.some((a) => answer.includes(a));
        const hasChoice = choices.includes(choiceCode);
        return hasQuestion && hasAnwer && hasChoice;
      });
    // disable question when all choices are disabled
    const disableQuestion = (question) => {
      return (
        question.type !== 'text' &&
        question.choices.every(({ code }) => hasCondition(question, code))
      );
    };
    // get classname for `li` elements
    const getListClassName = (question) =>
      classname('mb-24', { disabled: disableQuestion(question) });

    // head component to show when present
    const QuestionHead = ({ head }) => {
      const [show, setShow] = useState(false);
      const iconClass = classname('a-icon', { up: show });

      return (
        head !== null && (
          <div className="o-question-head">
            <div className="m-title-wrapper" onClick={() => setShow(!show)}>
              <TextBody className="a-title" variant="white">
                Lihat {head.title}
              </TextBody>
              <img src={Caret} alt="caret" className={iconClass} />
            </div>
            {show && (
              <div className="m-image-wrapper">
                <img className="a-image" src={head.img} alt={head.alt} />
              </div>
            )}
          </div>
        )
      );
    };

    return isLoading ? (
      <Skeleton />
    ) : (
      <form onSubmit={this.handleSubmit}>
        <H4 color="black" weight="bold">
          {groupTitle}
        </H4>
        {alert && <Notification status="error" title={alert} />}
        <ol>
          {questions?.map(
            (question) =>
              !disableQuestion(question) && (
                <li key={question.id62} className={getListClassName(question)}>
                  <TextBody>{question.title}</TextBody>
                  <QuestionHead head={question.head} />
                  {this.validationError(question.id62, question.type)}
                  {inputs[question.type](question, hasCondition)}
                </li>
              )
          )}
        </ol>
        {questions && (
          <div className="button-wrapper">
            <Button
              variant="secondary"
              disabled={currentGroup === firstGroup}
              onClick={() => this.handleChangePage(-1)}
            >
              Kembali
            </Button>
            <Button variant="primary" type="submit">
              Lanjutkan
            </Button>
          </div>
        )}
      </form>
    );
  };

  checkboxInput = (question, hasCondition) => {
    const { answers } = this.state;

    // find answer for this question (if any)
    const answer = answers.find(
      (answer) => answer.question_id62 === question.id62
    );
    // see if that choice is checked
    const answerIds = answer ? answer.answers.map(({ id62 }) => id62) : [];

    return question.choices.map((choice) => (
      <div key={choice.id62} className="form-relative">
        <CheckBox
          id={choice.id62}
          isChecked={answerIds.includes(choice.id62)}
          disabled={hasCondition(question, choice.code)}
          className={{ 'is-error': this.hasError(question.id62) }}
          onChange={this.handleSelectAnswer(question, choice, true)}
        >
          <TextBody color="black" weight="black">
            {choice.display_name}
          </TextBody>
        </CheckBox>
      </div>
    ));
  };

  radioInput = (question, hasCondition) => {
    const { answers } = this.state;

    // find answer for this question (if any)
    const answer = answers.find(
      (answer) => answer.question_id62 === question.id62
    );
    // see if that choice is checked
    const answerIds = answer ? answer.answers.map(({ id62 }) => id62) : [];

    return question.choices.map((choice) => (
      <div key={choice.id62} className="form-relative">
        <Radio
          id={choice.id62}
          name={`radio-${question.id62}`}
          isChecked={answerIds.includes(choice.id62)}
          disabled={hasCondition(question, choice.code)}
          className={{ 'is-error': this.hasError(question.id62) }}
          onChange={this.handleSelectAnswer(question, choice)}
          onDisabled={() => this.handleUnselectAnswer(question, choice)}
        >
          <TextBody color="black" weight="black">
            {choice.display_name}
          </TextBody>
        </Radio>
      </div>
    ));
  };

  textInput = (question) => {
    const { answers } = this.state;
    const answer = answers.find(
      (answer) => answer.question_id62 === question.id62
    );
    return (
      <InputTextArea
        id={question.id62}
        variant="title-black input-gray width-full"
        value={answer?.value_text || ''}
        handleChange={(e) => this.handleInputAnswer(question.id62, e)}
      />
    );
  };

  validationError = (questionId, questionType) => {
    const { errors } = this.state;
    const error = errors.find((error) => error.id62 === questionId);
    return (
      error && (
        <TextBody color="red" weight="light" className="my-8">
          {errorTemplates[questionType]}
        </TextBody>
      )
    );
  };

  // EVENT HANDLERS
  /**
   * @summary this is a behemoth of a function, so bear with me with this comments
   * @description this function handles choice selection for either a radio or checkbox
   * @param  {object} question question object for the current question
   * @param  {object} answer the selected answer object for the current question
   * @param  {boolean} multiple specify if it allows multiple answers
   */
  handleSelectAnswer = (question, answer, multiple) => () => {
    const { nonce, answers, answerCodes } = this.state;
    const clonedAnswers = [...answers];
    const clonedAnswerCodes = { ...answerCodes };
    const oldAnswer = clonedAnswers.find(
      (answer) => answer.question_id62 === question.id62
    );
    const oldAnswerCode = clonedAnswerCodes[question.code];
    const answerIndex = oldAnswer?.answers.findIndex(
      ({ id62 }) => id62 === answer.id62
    );
    const answerCodeIndex = oldAnswerCode?.findIndex(
      (code) => code === answer.code
    );
    let newAnswerCodes;
    let newAnswers;

    if (oldAnswer && !multiple) {
      // if the question is a radio
      // and has been answered
      // replace the answer with a new one
      oldAnswer.answers = [{ id62: answer.id62 }];
      newAnswers = clonedAnswers;
      newAnswerCodes = { ...answerCodes, [question.code]: [answer.code] };
    } else if (oldAnswer && multiple) {
      // if the question is a checkbox
      // but the choice has been checked
      // remove the checked option from answer
      if (answerIndex !== -1) oldAnswer.answers.splice(answerIndex, 1);
      // if a new choice is selected
      // add to existing answers
      else oldAnswer.answers.push({ id62: answer.id62 });
      if (answerCodeIndex !== -1) oldAnswerCode.splice(answerCodeIndex, 1);
      else oldAnswerCode.push(answer.code);
      newAnswers = clonedAnswers.filter(({ answers }) => answers.length);
      newAnswerCodes = { ...answerCodes, [question.code]: oldAnswerCode };
    } else {
      // if it's a brand new answer
      // add a new answer object
      const newAnswer = {
        nonce,
        question_id62: question.id62,
        answers: [{ id62: answer.id62 }]
      };
      newAnswers = [...answers, newAnswer];
      newAnswerCodes = { ...answerCodes, [question.code]: [answer.code] };
    }

    if (this.hasError(question.id62)) this.removeError(question.id62);
    this.setState({ answers: newAnswers, answerCodes: newAnswerCodes });
  };

  handleUnselectAnswer = (question, choice) => {
    const { answers, answerCodes } = this.state;
    const questionIndex = answers.findIndex(
      (answer) => answer.question_id62 === question.id62
    );
    if (questionIndex !== -1) {
      const clonedAnswers = [...answers];
      const newAnswers = clonedAnswers[questionIndex].answers;
      const answerIndex = newAnswers.findIndex(
        ({ id62 }) => id62 === choice.id62
      );
      if (answerIndex === -1) return;
      newAnswers.splice(answerIndex, 1);
      this.setState({
        answers: clonedAnswers.filter(({ answers }) => answers.length)
      });
    }
    if (question.code in answerCodes) {
      const clonedAnswers = { ...answerCodes };
      const newAnswerCodes = clonedAnswers[question.code];
      const answerIndex = newAnswerCodes.findIndex((a) => a === choice.code);
      if (answerIndex === -1) return;
      newAnswerCodes.splice(answerIndex, 1);
      Object.entries(clonedAnswers).forEach(([key, value]) => {
        if (!value.length) delete clonedAnswers[key];
      });
      this.setState({ answerCodes: clonedAnswers });
    }
  };

  handleInputAnswer = (questionId, { target: { value } }) => {
    const { nonce, answers } = this.state;
    const clonedAnswers = [...answers];
    const oldAnswer = clonedAnswers.find(
      (answer) => answer.question_id62 === questionId
    );
    let newAnswers;

    if (oldAnswer) {
      oldAnswer.value_text = value;
      newAnswers = clonedAnswers;
    } else {
      const newAnswer = {
        nonce,
        question_id62: questionId,
        value_text: value
      };
      newAnswers = [...answers, newAnswer];
    }

    if (this.hasError(questionId)) this.removeError(questionId);
    this.setState({ answers: newAnswers });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.postAnswers();
  };

  // RENDER
  render() {
    const { breadcrumbs, progress, surveyGroups, isSubmitting } = this.state;
    const classNames = classname('o-form-survey', {});

    return (
      <div className={classNames}>
        <div className="form-survey-header">
          <Navbar />
        </div>
        <HeaderBanner
          imageDesktop={ImageHeaderBanner}
          imageMobile={ImageHeaderBannerMobile}
          title="Survey Kompetensi"
          withNav={breadcrumbs}
        />
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <CardProgressBar
                nameProgress="PROGRESS"
                valueBar={`${progress}%`}
              />
              <CardFormSurvey
                sidebarCard={surveyGroups}
                contentCard={this.activeGroup()}
                loading={isSubmitting}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

FormSurvey.propTypes = {
  history: PropTypes.object
};

FormSurvey.defaultProps = {
  history: { push: '/' }
};

export default FormSurvey;
