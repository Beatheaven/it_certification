// Input Component
// --------------------------------------------------------

import React from 'react';
import PropTypes from 'prop-types';
import classname from 'classnames';
import './styles.scss';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import TextBody from '../TextBody';
import 'react-datepicker/dist/react-datepicker.css';

const Input = ({
  id,
  className,
  placeholder,
  variant,
  value,
  name,
  type,
  title,
  subtitle,
  titleBottom,
  handleChange,
  optionSelect,
  valueSelect,
  selectedDatePicker,
  titleBottomColor,
  isDisable,
  dateFormat,
  timeFormat,
  yearItemNumber,
  showYearPicker,
  showTimeSelect,
  showTimeSelectOnly,
  timeIntervals,
  timeCaption,
  maxlength,
  tabIndex,
  prepend,
  maxDate
}) => {
  const classNames = classname('o-input', className, variant);
  return (
    <div className={classNames}>
      {type === 'select' ? (
        <>
          {title && (
            <div className="text-title black">
              {title}
              {subtitle && (
                <TextBody color="gray" weight="light">
                  {subtitle}
                </TextBody>
              )}
            </div>
          )}
          <Select
            id={id}
            options={optionSelect}
            value={optionSelect.filter((obj) => obj.value === valueSelect)}
            onChange={handleChange}
          />
          {titleBottom && (
            <TextBody color="red" weight="light" variant={variant}>
              {titleBottom}
            </TextBody>
          )}
        </>
      ) : type === 'date' ? (
        <>
          {title && (
            <div className="text-title">
              {title}
              {subtitle && (
                <TextBody color="gray" weight="light">
                  {subtitle}
                </TextBody>
              )}
            </div>
          )}
          <DatePicker
            id={id}
            selected={selectedDatePicker}
            onChange={handleChange}
            showYearPicker={showYearPicker}
            dateFormat={dateFormat}
            timeFormat={timeFormat}
            yearItemNumber={20}
            showTimeSelect={showTimeSelect}
            showTimeSelectOnly={showTimeSelectOnly}
            timeIntervals={timeIntervals}
            timeCaption={timeCaption}
            maxDate={maxDate}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
          />
          {titleBottom && (
            <TextBody
              color={titleBottomColor || 'red'}
              weight="light"
              variant={variant}
            >
              {titleBottom}
            </TextBody>
          )}
        </>
      ) : (
        <>
          {title && (
            <div className="text-title">
              {title}
              {subtitle && (
                <TextBody color="gray" weight="light">
                  {subtitle}
                </TextBody>
              )}
            </div>
          )}
          <input
            id={id}
            className={prepend && 'prepended'}
            name={name}
            type={type}
            placeholder={placeholder}
            variant={variant}
            value={value}
            onChange={handleChange}
            disabled={isDisable}
            maxLength={maxlength}
            tabIndex={tabIndex}
          />
          {prepend && <div className="text-prepend">{prepend}</div>}
          {titleBottom && (
            <TextBody
              color={titleBottomColor || 'red'}
              weight="light"
              variant={variant}
            >
              {titleBottom}
            </TextBody>
          )}
        </>
      )}
    </div>
  );
};

Input.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  variant: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string]), // PropTypes.number
  name: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  titleBottom: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  handleChange: PropTypes.func,
  selectedDatePicker: PropTypes.instanceOf(Date),
  titleBottomColor: PropTypes.string,
  showYearPicker: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  dateFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  yearItemNumber: PropTypes.string,
  showTimeSelect: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  showTimeSelectOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  timeIntervals: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  timeCaption: PropTypes.string,
  optionSelect: PropTypes.array,
  valueSelect: PropTypes.oneOfType([PropTypes.string]), // PropTypes.number
  isDisable: PropTypes.bool,
  maxlength: PropTypes.number,
  maxDate: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
    PropTypes.instanceOf(Date)
  ]),
  tabIndex: PropTypes.number,
  prepend: PropTypes.string
};

Input.defaultProps = {
  className: '',
  placeholder: '',
  variant: '',
  type: '',
  id: '',
  value: '',
  name: '',
  title: '',
  subtitle: '',
  titleBottom: '',
  handleChange: () => {},
  selectedDatePicker: new Date(),
  titleBottomColor: '',
  showYearPicker: false,
  dateFormat: 'yyyy-MM-dd',
  timeFormat: '',
  yearItemNumber: '',
  showTimeSelect: false,
  showTimeSelectOnly: false,
  timeIntervals: '',
  timeCaption: '',
  optionSelect: [],
  valueSelect: null,
  isDisable: false,
  maxlength: null,
  tabIndex: 0,
  prepend: '',
  maxDate: new Date()
};

export default Input;
