import React from 'react';
import './index.scss';
import { empInfoFieldsUniqueLogin } from 'constants/retain';

const EmpInfoPopUp = ({ empData = {}, handleActions, userData = {} }) => {
  const formFields = empInfoFieldsUniqueLogin;

  return (
    <div className="employee-info">
      <div className="form-container">
        <div className="form-row">
          {formFields.map(field => {
            return (
              (field.showField ? field.showField(empData) : empData[field.dataKey]) && (
                <div className={field.className || 'form-field'}>
                  <div className="form-field__label">{field.label}</div>
                  <div className={`form-field__value ${field.valueClassName || ''}`}>
                    {field.cellData
                      ? field.cellData(empData, handleActions, userData)
                      : empData[field.dataKey]}
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EmpInfoPopUp;
